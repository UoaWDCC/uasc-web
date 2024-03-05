# Services

This folder should contain the logic for anything related to fetching from the backend

Example:

```ts
// UserService.ts

import fetchClient from "./FetchClient"

const UserService = {
  getUsers: async function () {
    const res = await fetchClient.GET("/users/{userId}", {
      params: {
        path: {
          userId: 1232
        }
      }
    })
    return res.data
  }
}

export default UserService
```
