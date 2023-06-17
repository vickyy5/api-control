import prisma from "../db";


export const getWorks = async (req,res) => {
    const works = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }, select: {
            name: false,
            lastname: false,
            username: false,
            password: false,
            works: true
        }
    })

    res.json({data: works})
}


export const getOneWork = async (req,res) => {
    const work = await prisma.work.findUnique({
        where: {
            id: req.params.id
        }, include: {
            users:true,
            fronProject: true
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
            physicalProgress: req.body.physicalProgress,
            dependency:{
                connect:{
                    id: req.body.depId
                }
            },
            Contratist:{
                connect:{
                    id: req.body.contId
                }
            }
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


export const addFrontWork = async (req,res) => {
    const frontsNames = req.body.fronts 
    const clearFrontNames = frontsNames.map(x => ({name:`${x}`}))

    for(const front of frontsNames){
        const frontSearch = await prisma.frontProject.findUnique({
            where:{
                id: front
            }
        })
    
        if(!front){
            res.json(400)
            res.json({error: `El FrontProject: ${front}, no se encontro`})
            return
        }
    }

    const added = await prisma.work.update({
        where: {
            id: req.params.id
        }, data :{
            fronProject:{
                connect: clearFrontNames
            }
        }, include: {
            fronProject: true
        } 
    })

    res.json({data: added})
}


export const deleteFrontWork = async (req,res) => {
    const frontsNames = req.body.fronts

    
    const clearFrontNames = frontsNames.map(x => ({name:`${x}`}))

    for(const front of frontsNames){
        const frontSearch = await prisma.frontProject.findUnique({
            where:{
                id: front
            }
        })
    
        if(!front){
            res.json(400)
            res.json({error: `El FrontProject: ${front}, no se encontro`})
            return
        }
    }



    const deleted = await prisma.work.update({
        where:{
            id: req.params.id,
        }, data: {
            fronProject: {
                disconnect: clearFrontNames
            },
        }, include: {
            fronProject: true
        }
    })

    res.json({data: deleted})
}