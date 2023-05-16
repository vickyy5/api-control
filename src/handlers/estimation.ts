import prisma from "../db";

export const deleteEstim = async (req,res) => {
    const deleted = await prisma.estimations.delete({
        where:{
            id: req.params.id
        }
    })
}


