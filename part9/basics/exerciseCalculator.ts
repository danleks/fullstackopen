interface Stats {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

interface DaysStats {
    target: number,
    dailyTraining: Array<number>,
}

const parseArguments = (args: Array<string>): DaysStats => {
    if (args.length < 3) throw new Error('too little args');
    if (args.length > 12) throw new Error('too many args');
 
    let target = 0;
    const dailyTraining: Array<number> = [];

    args.slice(2).forEach((a, index) => {
        if (!isNaN(Number(a))) {
            if (index === 0) {
                target = Number(a);
            } else {
                dailyTraining.push(Number(a));
            }
        } else {
            throw new Error('only number are expected');
        }
    });

    return {
        target,
        dailyTraining,
    };
};

export const calculateExercises = (hours: Array<number>, target: number): Stats => {
    const periodLength = hours.length;
    const trainingDays = hours.reduce((acc: number, curVal: number): number => {
        if (curVal > 0) {
            acc++;
        }

        return acc;

    }, 0);
    const average = hours.reduce((acc: number, currentValue: number): number => {
        return acc + currentValue;
    }, 0) / hours.length;
    const success = average < target ? false : true;
    const rating = average > 2 ? 2 : 1;
    const ratingDescription = rating <= 2 ? 'not too bad but could be better' : 'very good';


    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

try {
    const {target, dailyTraining} = parseArguments(process.argv);
    console.log(calculateExercises(dailyTraining, target));
} catch (error: unknown) {
    let errorMessge = 'smth ver bad happened';

    if (error instanceof Error) {
        errorMessge += ' Error ' + error.message;
    }

    console.log(errorMessge);
}

