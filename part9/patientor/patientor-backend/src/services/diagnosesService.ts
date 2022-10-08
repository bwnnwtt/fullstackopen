import diagnoses from "../../data/diagnoses";
import { Diagnose } from "../types";

const getAllDianosisEntries = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getAllDianosisEntries
};