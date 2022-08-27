import express from 'express';
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";
const route = express.Router();

route.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

route.get('/:id', (req, res) => {
    const patient = patientsService.getPatientById(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.status(400).send('no entry');
    }
});

route.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient = patientsService.addNewPatient(newPatientEntry);
        res.json(newPatient);
    }catch (error: unknown) {
        let errorMessage = 'something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default route;