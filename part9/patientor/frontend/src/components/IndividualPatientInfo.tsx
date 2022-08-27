import React from 'react';
import {useParams} from "react-router-dom";
import {Patient} from "../types";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {setIndividualPatient, useStateValue} from "../state";
import EntryDetails from "./EntryDetails";

const IndividualPatientInfo = () => {
    const { id } = useParams<{ id: string}>();
    const [{patient, diagnoses}, dispatch] = useStateValue();

    const [error, setError] = React.useState<string>();

    React.useEffect(() => {
        const fetchIndividualPatient = async () => {
            try {
                const { data: IndividualPatientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(setIndividualPatient(IndividualPatientFromApi))
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error(e?.response?.data || 'Unrecognized axios error');
                    setError(String(e?.response?.data?.error) || 'Unrecognized axios error');
                } else {
                    console.error('unknown error', e);
                    setError('unknown error');
                }
            }
        }
        void fetchIndividualPatient()
    }, [])

    return (
        <div>
            {Object.values(patient).map((patient: Patient) => (
                <div key={patient.id}>
                    <h2>{patient.name}</h2>
                    <p>ssh: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                    <h3>entries</h3>
                    {patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)}
                </div>
            ))}
        </div>
    )
};

export default IndividualPatientInfo;