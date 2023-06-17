import prisma from "../db";


export const createContractor = async (req, res) => {
    const created = await prisma.contratist.create({
        data:{
            company: req.body.company
        }
    })

    return res.json({data: created})
}

export const deleteContractor = async (req, res) => {
    const deleted = await prisma.contratist.delete({
        where:{
            id: req.params.id
        }
    })

    return res.json({data: deleted})
}

export const getOneContractor = async (req, res) => {
    const contractor = await prisma.contratist.findUnique({
        where:{
            id: req.params.id
        }
    })

    return res.json({data: contractor})
}

export const getContractors = async (req, res) => {
    const contractors = await prisma.contratist.findMany({})

    return res.json({data: contractors})
}