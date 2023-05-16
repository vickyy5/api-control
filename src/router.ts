import {Router} from 'express'
import { body, validationResult } from "express-validator";
import { createFront, deleteFront, getFronts, getOneFront } from './handlers/fronts';
import { addFrontWork, addUserToWork, createWork, deleteFrontWork, deleteUsersWorks, deleteWork, getOneWork, getWorks, updateWork } from './handlers/works';

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

router.put("/works/addfront/:id", addFrontWork)
router.put("/works/deletefront/:id", deleteFrontWork)


/*
      Fronts
*/

router.get("/fronts",getFronts)

router.get("/fronts/:id",getOneFront)

router.put("/fronts/:id")

router.post("/fronts",
      body('name').exists().isString(),
      body('contract').exists().isString(),
      body('minutas').exists().isString(),
createFront)

router.delete("/fronts/:id", deleteFront)


/*
      Estimaciones
*/



export default router