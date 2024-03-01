import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import { RegisterRoutes } from "routes/__generated__/routes"

let spec: swaggerUi.JsonObject | undefined
const importSwaggerJson = async () => {
  if (!process.env.DEV) {
    spec = await import("../../common/__generated__/swagger.json")
  }
}

dotenv.config()

const app: Express = express()

app.use(express.json())
app.use(cors())

app.use("/api-docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  if (process.env.DEV) {
    return res.send(
      swaggerUi.generateHTML(
        await import("../../common/__generated__/swagger.json")
      )
    )
  } else {
    // Prod
    if (!spec) {
      importSwaggerJson()
    }
    return res.send(swaggerUi.setup(spec))
  }
})
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World From the Typescript Server!")
})

RegisterRoutes(app)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
