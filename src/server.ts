import express from 'express'
import { login, pong } from './handlers/user'
import { protect } from './modules/auth'
//import morgan from 'morgan'
import router from './router'

const app = express()

//app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/ping", pong)

app.use("/api",protect,router)


app.post("/login", login)

export default app