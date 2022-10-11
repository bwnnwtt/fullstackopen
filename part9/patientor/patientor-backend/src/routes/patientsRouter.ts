/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.json(patientsService.getAllPatients());
});

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatientById(id);
  if (patient) {
    return res.json(patient);
  } else {
    return res.status(404).send({ error: 404, message: 'Not Found'});
  }
});

patientsRouter.post('/', (req, res) => {

  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;