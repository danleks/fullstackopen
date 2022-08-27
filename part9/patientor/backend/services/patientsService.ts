import {PatientWithNonSensitiveData, NewPatientEntry, Patient} from "../types";
import {patients} from "../data/patients";
import { v1 as uuid } from 'uuid';

const getPatients = ():PatientWithNonSensitiveData[] => {
    return patients.map(({id, name, dateOfBirth,gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatientById = (id: string) : Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addNewPatient = (patient: NewPatientEntry): Patient => {
    const id: string = uuid();
    const newPatient = {
        id,
        ...patient,
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addNewPatient,
    getPatientById,
};