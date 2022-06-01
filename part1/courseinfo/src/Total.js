const Total = ({parts}) => {
    return (
        <p>Number of exercises {parts.map(part => part.exercises).join('+')}</p>
    )
};

export default Total;