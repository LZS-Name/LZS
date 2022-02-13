const express = require('express')
const router = express.Router()
import {Request, Response} from 'express';
import { createApplication, getApplication, getApplicationByStatusAndApplicationType } from '../services/application';

// Getting Application
router.get('/:id', async (req: Request, res: Response) => {
    try{
        const application = await getApplication(req.params.id)
          return res.status(200).send({data: {...application}});
    }catch (err: any) {
        res.status(400).json({ message: err.message })
      }
  })

// Getting Filtered Application
router.get('/filter', async (req: Request, res: Response) => {
    try{
        const application = await getApplicationByStatusAndApplicationType(req.body.status, req.body.applicationType)
          return res.status(200).send({data: {...application}});
    }catch (err: any) {
        res.status(400).json({ message: err.message })
      }
  })
  
// Creating one
router.post('/create', async (req: Request, res: Response) => {
try {
    const newApplication = createApplication(req.body);
    res.status(200).json(newApplication)
} catch (err: any) {
  res.status(400).json({ message: err.message })
}
})

  module.exports = router