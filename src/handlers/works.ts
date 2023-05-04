import prisma from "../db";


export const getWorks = async (req,res) => {
    const works = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }, include: {
            works: true
        }
    })

    res.json({data: works})
}


export const getOneWork = async (req,res) => {
    const work = await prisma.work.findUnique({
        where: {
            id: req.params.id
        }       
    })

    res.json({data: work})
}

export const updateWork = async (req,res) => {
    const updated = await prisma.work.update({
        where:{
            id: req.params.id
        },
        data:{
            name: req.body.name,
            location: req.body.location,
            contratist: req.body.contratist,
            projects: req.body.projects,
            financialProgress: req.body.financialProgress,
            physicalProgress: req.body.physicalProgress
        }
    })

    res.json({data: updated})
}

export const createWork = async (req,res) => {
    const created = await prisma.work.create({
        data:{
            name: req.body.name,
            location: req.body.location,
            contratist: req.body.contratist,
            projects: req.body.projects,
            financialProgress: req.body.financialProgress,
            physicalProgress: req.body.physicalProgress
        }
    })
    
    res.json({data: created})
}

export const deleteWork = async (req,res) => {
    const deleted = await prisma.work.delete({
        where:{
            id: req.params.id
        }
    })

    res.json({data: deleted})
}


//export const addUserToWork = async (req, res) => {
    
//}