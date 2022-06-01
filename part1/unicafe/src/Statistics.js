import StatisticLine from "./StatisticLine";

const Statistics = ({statistics: {good, neutral, bad, total, averageScore, positivePercentage}}) => {
    return (
        <table>
            <tbody>
                <StatisticLine text='good' value={good}/>
                <StatisticLine text='neutral' value={neutral}/>
                <StatisticLine text='bad' value={bad}/>
                <StatisticLine text='total' value={total}/>
                <StatisticLine text='average' value={averageScore}/>
                <StatisticLine text='positive' value={`${positivePercentage} %`}/>
            </tbody>
        </table>
    )
};

export default Statistics;