import "dotenv/config"
import express, { Express, Request, Response } from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import { RegisterRoutes } from "middleware/__generated__/routes"
import helmet from "helmet"
import https from "https"

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
app.get("/", (_req: Request, res: Response) => {
  res.send("UASC backend server is up!")
})

RegisterRoutes(app)

const port = process.env.PORT || 8000

let _app

if (process.env.NODE_ENV === "production") {
  const httpsPort = process.env.HTTPS_PORT || 8443
  const httpsApp = https.createServer(
    { key: process.env.SERVER_KEY, cert: process.env.SERVER_CERTIFICATE },
    app
  )
  _app = httpsApp.listen(httpsPort, () => {
    console.log(`UASC backend server HTTPs listening on port ${httpsPort}.`)
  })
} else {
  _app = app.listen(port, () => {
    console.log(`UASC backend server listening on port ${port}.`)
  })
}

// So we can use for testing
export { _app }
