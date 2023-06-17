import prisma from "../db";


export const createCatalogo = async (req, res) => {
    const created = await prisma.catalogo.create({
        data:{
            name: req.body.name,
            descrip: req.body.name,
            front:{
                connect:{
                    id: req.body.frontId
                }
            }
        }
    })

    return res.json({data: created})
}

export const getOneCatalogo = async (req, res) => {
    const catalogo = await prisma.catalogo.findUnique({
        where:{
            id : req.params.id
        }
    })

    return res.json({data: catalogo})
}

export const getCatalogos = async (req, res) => {
    const catalogos = await prisma.catalogo.findMany()

    return res.json({data: catalogos})
}

export const deleteCatalogo = async (req, res) => {
    const deleted = await prisma.catalogo.delete({
        where:{
            id: req.params.id
        }
    })
}

