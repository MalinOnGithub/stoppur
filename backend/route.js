import express from 'express';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
const route = express.Router();

//Get all saved times (list)
route.get("/", async (req, res) => {
    const time  = await prisma.time_record.findMany({})
    res.json(time)
})

//Post time
route.post("/", async (req, res) => {
    const time = await prisma.time_record.create({
        data: {
            time: req.body.time
        }
    })
    res.json(time)
})


// delete time
route.delete("/:id", async (req, res)=> {

    await prisma.time_record.delete({
        where:{
            id: parseInt(req.params.id)
        }
    })

    res.sendStatus(204)
})

export default route;