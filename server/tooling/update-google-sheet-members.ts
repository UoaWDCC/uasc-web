import dotenv from "dotenv"
dotenv.config()

const args = process.argv.slice(2)

async function fetchUsers(token: string, cursor?: string): Promise<any> {
  const res = await fetch(
    // Note that VITE_BACKEND_BASE_URL does have a slash at the end
    `${process.env.VITE_BACKEND_BASE_URL}admin/users${cursor ? `?cursor=${cursor}` : ""}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`
      }
    }
  )
  const data = await res.json()
  return data
}

async function getAllUsers(token: string): Promise<any[]> {
  const allUsers = []
  let fetchedUsers = await fetchUsers(token)
  allUsers.push(...fetchedUsers.data)
  while (fetchedUsers.cursor) {
    fetchedUsers = await fetchUsers(token, fetchedUsers.cursor)
    allUsers.push(...fetchedUsers.data)
  }
  return allUsers
}

if (args.length === 0) {
  console.log("Token required to update google sheet members.")
} else {
  const token = args[0]

  getAllUsers(token).then(async (allUsers: any) => {
    console.log(allUsers)
  })
}
