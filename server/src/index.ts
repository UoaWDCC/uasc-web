import "dotenv/config"
import express, { Express, Request, Response } from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import { RegisterRoutes } from "middleware/__generated__/routes"
import helmet from "helmet"

let spec: swaggerUi.JsonObject | undefined
let generatedHtml: string | undefined
const importSwaggerJson = async () => {
  if (!process.env.DEV) {
    spec = await import("middleware/__generated__/swagger.json")
  }
}

const app: Express = express()

function keepRawBody(req: any, res: any, buf: Buffer) {
  if (buf && buf.length) {
    req.rawBody = buf
  }
}

app.use(helmet())
app.use(express.json({ verify: keepRawBody }))
app.use(cors())

app.use("/api-docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  if (process.env.DEV) {
    return res.send(
      swaggerUi.generateHTML(
        await import("middleware/__generated__/swagger.json")
      )
    )
  } else {
    // Prod
    if (!spec) {
      await importSwaggerJson()
      generatedHtml = swaggerUi.generateHTML(spec)
    }
    return res.send(generatedHtml)
  }
})
app.get("/", (req: Request, res: Response) => {
  res.send("UASC backend server is up!")
})

RegisterRoutes(app)

const port = process.env.PORT || 8000

const _app = app.listen(port, () => {
  console.log(`UASC backend server listening on port ${port}.`)
})

// So we can use for testing
export { _app }
