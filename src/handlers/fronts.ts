import { objectEnumValues } from "@prisma/client/runtime";
import prisma from "../db";

export const getFronts = async (req,res)=> {

    const works = await prisma.user.findMany({
        where: {
            id: req.user.id
        }, select: {
            id: true
        }
    })
  
    //console.log(works)

    const cleanWorks = works.map(x => (`${x.id}`))

    console.log(cleanWorks)

    const fronts =[]

    for (const workId of cleanWorks) {
        const front = await prisma.frontProject.findMany({
            where:{
                id: workId
            }
        })
    
        fronts.push(front)
    }

    res.json({data: fronts})

}


export const getOneFront = async (req,res) => {
    const front = await prisma.frontProject.findUnique({
        where:{
            id: req.params.id
        }
    }) 

    res.json({data: front})
}

export const createFront = async (req,res) => {

    const ob = {
        name:req.body.estimname,
        url: req.body.url
    }    

    const created = await prisma.frontProject.create({
        data:{
            name: req.body.name,
            contract: req.body.contract,
            minutas: req.body.minutas,
        }
    })

    res.json({data: created})
}


export const deleteFront = async (req,res) => {
    const deleted = await prisma.frontProject.delete({
        where:{
            id: req.params.id
        }
    })

    res.json({data: deleted})
}

export const updateFront = async (req,res) => {
    const updated = await prisma.frontProject.update({
        where:{
            id: req.params.id
        }, data:{
            name: req.body.name,
            contract: req.body.contract,
            minutas: req.body.minutas
        }
    })

    res.json({data: updated})
}


export const estimToFront = async (req,res) => {

    const added = await prisma.estimations.create({
        data:{
            name: req.body.name,
            url: req.body.url,
            frontProject:{
                connect: req.body.frontid
            }
        }
    })

    res.json({data: added})

}
