import {Router} from 'express'
import { body, validationResult } from "express-validator";
import { addUserToWork, createWork, deleteUsersWorks, deleteWork, getOneWork, getWorks, updateWork } from './handlers/works';

const router = Router()

/*
      Works
*/

router.get("/works", getWorks)

router.get("/works/:id", getOneWork)

router.put("/works/:id",
body('name').isString().optional(),
body('location').isString().optional(),
body('contratist').isString().optional(),
body('projects').isString().optional(),
body('financialProgress').isInt().optional(),
body('physicalProgress').isInt().optional(),
updateWork)

router.post("/works",
body('name').exists().isString(),
body('location').isString().exists(),
body('contratist').isString().exists(),
body('projects').isString().exists(),
body('financialProgress').isInt().exists(),
body('physicalProgress').isInt().exists(),
createWork)

router.delete("/works/:id", deleteWork)

router.put("/works/adduser/:id",addUserToWork)

router.put("/works/deleteuser/:id",deleteUsersWorks)



export default router