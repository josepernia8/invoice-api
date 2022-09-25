import dotenv from "dotenv"
import app from "./src/app"

dotenv.config()

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.info(`⚡️[server]: Server is running at https://localhost:${port}`)
})

export default app
