const Total = ({parts}) => {
    let totalOfExercises = parts.reduce((acc, currentVal) => {
        return acc + currentVal.exercises;
    }, 0)
    return (
        <strong>Total of {totalOfExercises} exercises</strong>
    )
};

export default Total;