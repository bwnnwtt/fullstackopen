import express from 'express';
import diagnosisService from '../services/diagnosesService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.json(diagnosisService.getAllDianosisEntries());
});

export default diagnosesRouter;