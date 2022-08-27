import {Gender, NewPatientEntry, Entries, EntryType} from "./types";

type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown,
    entries: Entries[],
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

const isProperEntryType = (type: any): type is EntryType => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(EntryType).includes(type);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('missing or invalid name' + name);
    }

    return name;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('missing or invalid date ' + date);
    }

    return date;
};

const parseSSN = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('missing or invalid sss ' + ssn);
    }

    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('missing or invalid gender ' + gender);
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('missing or invalid occupation ' + occupation);
    }

    return occupation;
};

const parseEntries = (entries: Entries[]): Entries[] => {
    entries.forEach((entry: Entries)=> {
        if (!entry.type || !isProperEntryType(entry.type)) {
            throw new Error('missing or invalid entry type');
        }
    });

    return entries;
};

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation, entries}: Fields): NewPatientEntry => {
    const newEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries),
    };

    return newEntry;
};

export default toNewPatientEntry;