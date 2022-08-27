import express from 'express';
import {calculateBmi} from "./bmiCalculator";
import {calculateExercises} from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('hello full stack');
});

app.get('/bmi/:id?', (req, res, next) => {
    try {
        const { height, weight } = req.query;

        if (!height || !weight) {
            res.status(400).send({error: "malformatted parameters"});
            throw new Error('too little args');
        }

        if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
            res.json({
                weight: Number(weight),
                height: Number(height),
                bmi:  calculateBmi(Number(height), Number(weight))
            });
        } else {
            res.status(400).send({error: "malformatted parameters"});
            throw new Error('only numbers are allowed');
        }
    } catch(error: unknown) {
        console.log(error);
        if (error instanceof Error) {
            next(error);
        }
    }

});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    if (!target || isNaN(Number(target))) {
        return res.status(400).send({error: 'malformatted parameters'});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    daily_exercises.forEach((n: number) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        if (daily_exercises.length < 1 || isNaN(Number(n))) {
            return res.status(400).send({error: 'malformatted parameters'});
        }

        return;
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);

    return res.json({result});
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});