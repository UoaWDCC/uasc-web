import { QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: ["data"],
      refetchOnWindowFocus: false
    }
  }
})

export default queryClient
