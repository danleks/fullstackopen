import React from 'react';
import {Entries, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry} from '../types'
import {useStateValue} from "../state";

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}

const Hospital: React.FC<{entry: HospitalEntry}> = ({entry}) => {
    const [{diagnoses}, dispatch] = useStateValue();
    return (
        <div style={{background: 'green'}}>
            <p>{entry.type}</p>
            <p>{entry.date}</p>
            <em>{entry.description}</em>
            <p>diagnose by {entry.specialist}</p>
            {entry.diagnosisCodes
                ?  <ul>
                    {entry.diagnosisCodes.map(code => (
                        <li key={code}>
                            {diagnoses[code]
                                ? <span>{diagnoses[code].code} {diagnoses[code].name}</span>
                                : null }
                        </li>
                    ))}
                </ul>
                : null
            }
        </div>
    );
};

const HealthCheck: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
    const [{diagnoses}, dispatch] = useStateValue();
    return (
        <div style={{background: 'grey'}}>
            <p>{entry.type}</p>
            <p>{entry.date}</p>
            <em>{entry.description}</em>
            <p>diagnose by {entry.specialist}</p>
            {entry.diagnosisCodes
                ?  <ul>
                    {entry.diagnosisCodes.map(code => (
                        <li key={code}>
                            {diagnoses[code]
                                ? <span>{diagnoses[code].code} {diagnoses[code].name}</span>
                                : null }
                        </li>
                    ))}
                </ul>
                : null
            }
        </div>
    );
};

const OccupationalHealthCare: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
    const [{diagnoses}, dispatch] = useStateValue();
    return (
        <div style={{background: 'yellow'}}>
            <p>{entry.type}</p>
            <p>{entry.date}</p>
            <em>{entry.description}</em>
            <p>diagnose by {entry.specialist}</p>
            {entry.diagnosisCodes
                ?  <ul>
                    {entry.diagnosisCodes.map(code => (
                        <li key={code}>
                            {diagnoses[code]
                                ? <span>{diagnoses[code].code} {diagnoses[code].name}</span>
                                : null }
                        </li>
                    ))}
                </ul>
                : null
            }
        </div>
    );
};

const EntryDetails: React.FC<{ entry: Entries }> = ({entry}) => {
    console.log(entry.type)
    switch(entry.type) {
        case 'Hospital':
            return <Hospital entry={entry as HospitalEntry} />;
        case 'HealthCheck':
            return <HealthCheck entry={entry as HealthCheckEntry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthCare entry={entry as OccupationalHealthcareEntry} />;
        default:
            //return assertNever(entry);
            return null
    }
};

export default EntryDetails;