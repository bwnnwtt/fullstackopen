import patients from "../../data/patients";
import { NewPatient, PublicPatient, Patient } from "../types";
import { v4 as uuidv4 } from 'uuid';

const getAllPatients = (): Array<PublicPatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {

  const newPatient = {
    id: uuidv4(),
    ...entry,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAllPatients,
  getPatientById,
  addPatient
};