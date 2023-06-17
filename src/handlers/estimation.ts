import prisma from "../db";

export const deleteEstim = async (req,res) => {
    const deleted = await prisma.estimations.delete({
        where:{
            id: req.params.id
        }
    })
}


export const getEstims = async (req,res) => {
    const Estims = await prisma.estimations.findMany({})

    return res.json({data: Estims})
}

export const getOneEstim = async (req, res) => {
    const estim = await prisma.estimations.findUnique({
        where:{
            id: req.params.id
        }
    })

    return res.json({data: estim})
}


