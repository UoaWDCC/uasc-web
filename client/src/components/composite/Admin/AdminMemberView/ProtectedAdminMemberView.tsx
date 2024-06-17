import { useUsersQuery } from "services/Admin/AdminQueries"
import { AdminMemberView, MemberColumnFormat } from "./AdminMemberView"
import {
  useDemoteUserMutation,
  usePromoteUserMutation
} from "services/Admin/AdminMutations"
import { TableRowOperation } from "components/generic/ReusableTable/TableUtils"
import AdminUserCreationModal, {
  AccountType
} from "./AdminUserCreation/AdminUserCreationModal"
import ModalContainer from "components/generic/ModalContainer/ModalContainer"
import { useState } from "react"
import { useSignUpUserMutation } from "services/User/UserMutations"
import queryClient from "services/QueryClient"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "firebase"
import { ReducedUserAdditionalInfo } from "models/User"

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

  // Need flatmap because of inner map
  const transformedDataList = data?.pages.flatMap(
    (page) =>
      page.data?.map((data) => {
        const transformedData: MemberColumnFormat = { uid: "" }
        transformedData.uid = data.uid
        transformedData.Name = `${data.first_name} ${data.last_name}`
        transformedData.Email = data.email
        transformedData["Date Joined"] = data.dateJoined
        transformedData.Status = data.membership
        return transformedData
      }) || [] // avoid undefined values in list
  )

  const { mutateAsync: promoteUser } = usePromoteUserMutation()
  const { mutateAsync: demoteUser } = useDemoteUserMutation()

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
      handler: () => {
        // TODO
        throw new Error("Not Implemented")
      }
    },
    {
      name: "edit",
      handler: () => {
        // TODO
        throw new Error("Not Implemented")
      }
    }
  ]

  return (
    <>
      <AdminMemberView
        fetchNextPage={() => {
          !isFetchingNextPage && hasNextPage && fetchNextPage()
        }}
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
