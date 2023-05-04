import express from 'express'
import { createNewUser, login } from './handlers/user'
import { protect } from './modules/auth'
//import morgan from 'morgan'
import router from './router'

const app = express()

//app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api",protect,router)

app.post("/user", createNewUser)

app.post("/login", login)

export default app