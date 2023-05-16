import prisma from "../db";


export const createWorker = async (req,res) => {
    const created = await prisma.worker.create({
        data:{
            name:req.body.name,
            lastname: req.body.lastname,
            username: req.body.username,
            role: req.body.role
        }
    })

    res.json({data: created})
}

export const deleteWorker = async (req, res) => {
    const deleted = await prisma.worker.delete({
        where:{
            id:req.params.id
        }
    })

    res.json({data: deleted})
}


export const updateWorker = async (req,res) => {
   const updated = await prisma.worker.update({
        where:{
            id: req.params.id
        },  data:{
                name:req.body.name,
                lastname: req.body.lastname,
                username: req.body.username,
                role: req.body.role
            }
   }) 

   res.json({data: updated})
}

export const addContratistToWorker = async (req,res) => {

    const contraNames = req.body.contratists

    const cleanNames = contraNames.map(x => ({company:`${x}`}))

    const added = await prisma.worker.update({
        where:{
            id: req.params.id
        }, data:{
            Contratist:{
                connect: cleanNames
            }
        }
    })


    res.json({data:added})
}