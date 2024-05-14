import { QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: "all"
    }
  }
})

export default queryClient
