import dotenv from "dotenv"
dotenv.config()

// Configuration
const accountId = process.env.CF_ACCOUNT_ID
const projectName = process.env.CF_PROJECT_NAME
const authToken = process.env.CF_AUTH_TOKEN

interface CloudflareResponse<T> {
  success: boolean
  errors: any[]
  result: T
  result_info?: {
    page: number
    per_page: number
    total_pages: number
    total_count: number
  }
}

interface Deployment {
  id: string
  created_on: string
}

if (!accountId || !projectName || !authToken) {
  console.error(
    "Please set CF_ACCOUNT_ID, CF_PROJECT_NAME, and CF_AUTH_TOKEN environment variables"
  )
  process.exit(1)
}

async function fetchPage(
  page: number,
  per_page: number = 25
): Promise<CloudflareResponse<Deployment[]>> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/deployments?page=${page}&per_page=${per_page}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      }
    }
  )

  const data = (await response.json()) as CloudflareResponse<Deployment[]>
  if (!data.success) {
    throw new Error(
      `Failed to fetch deployments: ${JSON.stringify(data.errors)}`
    )
  }

  return data
}

async function getAllDeployments(): Promise<Deployment[]> {
  const firstPage = await fetchPage(1)
  const totalPages = firstPage.result_info?.total_pages || 1

  let allDeployments = [...firstPage.result]

  // Fetch remaining pages if they exist
  if (totalPages > 1) {
    const remainingPages = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, i) => fetchPage(i + 2))
    )

    allDeployments = [
      ...allDeployments,
      ...remainingPages.flatMap((page) => page.result)
    ]
  }

  return allDeployments
}

async function deleteDeployment(deploymentId: string): Promise<void> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}/deployments/${deploymentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json"
      }
    }
  )

  const data = (await response.json()) as CloudflareResponse<any>
  if (!data.success) {
    throw new Error(
      `Failed to delete deployment ${deploymentId}: ${JSON.stringify(data.errors)}`
    )
  }
}

async function main() {
  try {
    console.log("Fetching all deployments...")
    const deployments = await getAllDeployments()

    const sortedDeployments = deployments.sort(
      (a, b) =>
        new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
    )

    if (sortedDeployments.length === 0) {
      console.log("No deployments found.")
      return
    }

    const latestDeployment = sortedDeployments[0]
    console.log(
      `Latest deployment: ${latestDeployment.id} (${latestDeployment.created_on})`
    )

    const deploymentsToDelete = sortedDeployments.slice(1)
    console.log(
      `Found ${deploymentsToDelete.length} older deployments to delete.`
    )

    for (const deployment of deploymentsToDelete) {
      console.log(
        `Deleting deployment ${deployment.id} from ${deployment.created_on}...`
      )
      await deleteDeployment(deployment.id)
      // Add a small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    console.log("Cleanup complete!")
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : "Unknown error"
    )
    process.exit(1)
  }
}

main()
