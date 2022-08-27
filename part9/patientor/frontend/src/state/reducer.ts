import { State } from "./state";
import {Diagnoses, Patient} from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_INDIVIDUAL_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnoses[];
    };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_INDIVIDUAL_PATIENT":
      return {
        ...state,
        patient: {
          [action.payload.id]: action.payload
        }
      }
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
              (memo, code) => ({...memo, [code.code]: code}),
              {}
          ),
        }
      }

    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi : Patient[]) : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  }
}

export const addPatient = (patient: Patient) : Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  }
}

export const setIndividualPatient = (patient: Patient) : Action => {
  return {
    type: 'SET_INDIVIDUAL_PATIENT',
    payload: patient
  }
}

export const setDiagnoses = (diagnoses: Diagnoses[]): Action => {
  return {
    type: 'SET_DIAGNOSES',
    payload: diagnoses,
  }
}
