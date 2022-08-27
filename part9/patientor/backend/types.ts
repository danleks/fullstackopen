//type Gender = 'male' | 'female';
export type PatientWithNonSensitiveData = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id'>;
interface Discharge {
    date: string,
    criteria: string,
}

export enum Gender {
    Male = 'male',
    Female = 'female',
}

export enum EntryType {
    HealthCheck = 'HealthCheck',
    Hospital = 'Hospital',
    OccupationalHealthcare = 'OccupationalHealthcare',
}

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntry {
    id: string,
    date: string,
    type: EntryType,
    specialist: string,
    diagnosisCodes?: Array<Diagnose['code']>,
    description?: string,
}

export interface HealthCheckEntry extends BaseEntry {
    healthCheckRating: HealthCheckRating,
}

export interface HospitalEntry extends BaseEntry {
    discharge: Discharge,
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    sickleave?: string,
}

export type Entries =
    | HospitalEntry
    | HealthCheckEntry
    | OccupationalHealthcareEntry;

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entries[]
}
