import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const pong = async (req,res) => {
    res.json({data: "pong"})
}

export const login = async (req,res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    const isValid = await comparePasswords(req.body.password, user.password)

    if (!isValid) {
        res.status(401)
        res.json({message:'Incorret Password'})
        return      
    }
    
    const token = createJWT(user)    
    res.json({token: token})
} 