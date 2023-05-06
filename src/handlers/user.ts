import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            password: await hashPassword(req.body.password),
            role: req.body.role
        }
    })
    //agregar manejo de errores jeje
    //const token = createJWT(user)
    res.json({token: "Usuario Creado :)"})
}


export const pong = async (req,res) => {
    res.json({data: "pong"})
}

export const login = async (req,res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })


    try {
        const isValid = await comparePasswords(req.body.password, user.password)
        if (!isValid || isValid === null){
            res.status(401)
            res.json({message:'Usuario o Contraseña incorrectos'})
            return      
        }
        const token = createJWT(user)    
        res.json({token: token, data: user})
    } catch {
        res.status(401)
        res.json({message:'Usuario o Contraseña incorrectos'})
    } 

} 