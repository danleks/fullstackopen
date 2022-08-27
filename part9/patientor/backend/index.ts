import express from 'express';
import cors from 'cors';
import diagnosesRoute from "./routes/diagnosesRoute";
import patientsRoute from "./routes/patientsRoute";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRoute);
app.use('/api/patients', patientsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});