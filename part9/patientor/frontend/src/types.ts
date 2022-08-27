export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
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

interface Discharge {
  date: string,
  criteria: string,
}

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string,
  date: string,
  type: EntryType,
  specialist: string,
  diagnosisCodes?: Array<Diagnoses['code']>,
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
    | HealthCheckEntry
    | OccupationalHealthcareEntry
    | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entries[];
}