import {
  useMemberGoogleSheetUrlQuery,
  useUsersQuery
} from "@/services/Admin/AdminQueries"
import { AdminMemberView, type MemberColumnFormat } from "./AdminMemberView"
import {
  useDeleteUserMutation,
  useDemoteUserMutation,
  usePromoteUserMutation,
  useResetMembershipsMutation
} from "@/services/Admin/AdminMutations"
import type { TableRowOperation } from "@/components/generic/ReusableTable/TableUtils"
import AdminUserCreationModal, {
  type AccountType
} from "./AdminUserCreation/AdminUserCreationModal"
import ModalContainer from "@/components/generic/ModalContainer/ModalContainer"
import { useState, useMemo, useRef, useCallback } from "react"
import { useSignUpUserMutation } from "@/services/User/UserMutations"
import queryClient from "@/services/QueryClient"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/firebase"
import type { ReducedUserAdditionalInfo } from "@/models/User"
import { CSVLink } from "react-csv"
import { DateUtils } from "@/components/utils/DateUtils"

/**
 * Component that handles all the network requests for `AdminMemberView`
 *
 * This should be the one used on the actual page to allow for isolated testing
 * of the presentation on the `AdminMemberView`
 */
const WrappedAdminMemberView = () => {
  /**
   * Note that the followind queries/mutations should be scoped to only admins only,
   */
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useUsersQuery()

  /**
   * The `admin` key is important as we don't want to share cache with the normal sign up
   */
  const { mutateAsync: addNewUser } = useSignUpUserMutation("admin")

  const { mutateAsync: resetAllMemberships } = useResetMembershipsMutation()

  /**
   * https://stackoverflow.com/a/68066447
   */
  const csvLinkRef = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null)

  /**
   * @param email the email to be associated with the newly created user
   * @param user the details to be appended to the user account. This should be the required fields for `UserAdditionalInfo`
   * @param accountType what status the user account should be after creation:
   * - a `guest` will have to pay to access all features
   * - a `member` will be able to use all features right away after signing in
   */
  const userCreationHandler = async (
    email: string,
    user: ReducedUserAdditionalInfo,
    accountType: AccountType
  ) => {
    await addNewUser(
      { email, user },
      {
        async onSuccess(data) {
          alert(
            `Successfully added ${user.first_name} ${user.last_name} (${email})`
          )
          /**
           * We need to do this for both guests and members
           */
          await sendPasswordResetEmail(auth, email)
          if (accountType === "member" && data?.uid) {
            await promoteUser(data.uid)
          }
          /**
           * Force refetch after adding the new user
           */
          queryClient.invalidateQueries({ queryKey: ["allUsers"] })
        },
        onError(error) {
          alert(error.message)
        }
      }
    )
  }

  /**
   * Controls if the *Add new user* modal should be shown
   */
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false)

  /**
   * Kept
   */
  const untransformedUsers = useMemo(() => {
    return (
      data?.pages.flatMap(
        (page) =>
          page.data?.map((data) => {
            return {
              ...data,
              date_of_birth: DateUtils.formattedNzDate(
                new Date(DateUtils.timestampMilliseconds(data.date_of_birth))
              )
            }
          }) || [] // avoid undefined values in list
      ) || []
    )
  }, [data])

  // Need flatmap because of inner map
  const transformedDataList = useMemo(
    () =>
      untransformedUsers?.map((user) => {
        const transformedData: MemberColumnFormat = { uid: "" }
        transformedData.uid = user.uid
        transformedData.Name = `${user.first_name} ${user.last_name}`
        transformedData.Email = user.email
        transformedData["Date Joined"] = user.dateJoined
        transformedData.Status = user.membership
        return transformedData
      }) || [], // avoid undefined values in list
    [untransformedUsers]
  )

  const { mutateAsync: promoteUser } = usePromoteUserMutation()
  const { mutateAsync: demoteUser } = useDemoteUserMutation()
  const { mutateAsync: deleteUser, isPending } = useDeleteUserMutation()
  const { data: memberGoogleSheetData } = useMemberGoogleSheetUrlQuery()

  const handleExportUsers = useCallback(() => {
    if (hasNextPage) {
      return
    }
    csvLinkRef.current?.link?.click()
  }, [hasNextPage])

  /**
   * You should optimistically handle the mutations in `AdminMutations`
   */
  const rowOperations: TableRowOperation[] = [
    {
      name: "promote",
      handler: (uid: string) => {
        promoteUser(uid)
      }
    },
    {
      name: "demote",
      handler: (uid: string) => {
        demoteUser(uid)
      }
    },
    {
      name: "delete",
      handler: (uid: string) => {
        const matchingUser = transformedDataList?.find(
          (user) => user.uid === uid
        )
        /**
         * This should be enforced in the endpoint anyway, exists for UX
         */
        if (matchingUser?.Status === "admin") {
          alert("You may not delete admins")
          return
        }
        if (
          confirm(
            `Are you SURE you want to delete the user ${matchingUser?.Name} (${matchingUser?.Email}). This action can NOT be undone!!!`
          )
        )
          deleteUser({ uid })
      }
    },
    {
      name: "edit",
      handler: () => {
        // TODO
        alert("Not Implemented")
      }
    }
  ]

  return (
    <>
      <CSVLink
        className="hidden"
        filename={"uasc-user-data.csv"}
        data={untransformedUsers}
        ref={csvLinkRef}
      />
      <AdminMemberView
        fetchNextPage={() => {
          !isFetchingNextPage && hasNextPage && fetchNextPage()
        }}
        handleGoToGoogleSheet={() => {
          if (memberGoogleSheetData) {
            window.open(memberGoogleSheetData, "_blank")
          }
        }}
        handleResetMemberships={async () => {
          if (
            confirm(
              "Are you SURE you want to reset all memberships for ALL members (they will have to pay for membership again). This may take a few minutes."
            )
          ) {
            await resetAllMemberships()
          }
        }}
        hasNextPage={hasNextPage}
        exportUserDataHandler={handleExportUsers}
        isUpdating={isPending}
        rowOperations={rowOperations}
        data={transformedDataList}
        openAddMemberView={() => setShowAddUserModal(true)}
      />
      <ModalContainer isOpen={showAddUserModal}>
        <AdminUserCreationModal
          handleClose={() => setShowAddUserModal(false)}
          userCreationHandler={async ({ email, user }, accountType) => {
            await userCreationHandler(email, user, accountType)
          }}
        />
      </ModalContainer>
    </>
  )
}

export default WrappedAdminMemberView
