// The formula is BMI = kg/m2 where kg is a person's weight in kilograms and m2 is their height in metres squared.
// A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9.
// BMI applies to most adults 18-65 years.

type Message = 'Normal (healthy weight)' | 'Overweight' | 'Underweight';
interface BmiVales {
    value1: number,
    value2: number, 
}

export const calculateBmi = (height: number, weight: number): Message => {
    const bmi: number = ( weight / Math.pow(height, 2)) * 10000;

    if (bmi >= 25) {
        return 'Overweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return 'Normal (healthy weight)';
    } else {
        return 'Underweight';
    }
};

const parseArgs = (args: Array<string>): BmiVales => {
    if (args.length > 4) throw new Error('too many args');
    if (args.length < 4) throw new Error('too little args');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3]),
        };
    } else {
        throw new Error('only numbers are accepted');
    }
};


try {
    if (process.argv[1] === 'bmiCalculator.ts') {
        const {value1, value2} = parseArgs(process.argv);
        console.log(calculateBmi(value1, value2));
    }
} catch (error: unknown) {
    let errorMessage = 'Something unexpected happened';
    console.log('WHY HERE?');
    if (error instanceof Error) {
        errorMessage += 'Error ' + error.message;
    }
    console.log(errorMessage);
}