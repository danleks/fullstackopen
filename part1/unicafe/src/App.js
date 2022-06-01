import {useState, useEffect} from "react";
import Statistics from "./Statistics";
import Button from "./Button";

function App() {
    // save click of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);
    const [averageScore, setAverageScore] = useState(0);
    const [positivePercentage, setPositivePercentage] = useState(0);
    const [feedback, setFeedback] = useState(false);

    useEffect(() => {
        calculateAverage({score, good});
    }, [score, good, total])

    function calculateAverage ({score, good}) {
        if (isNaN(score / total || good / total)) return;

        setAverageScore(score / total);
        setPositivePercentage(good / total * 100);
    }

    function validateScore (score) {
        if (score < 0) {
            return 0;
        }
        return score;
    }

    const handleClick = ({type}) => {
        setFeedback(true);
        switch (type) {
            case 'GOOD':
                setGood(prevState => prevState + 1);
                setTotal(prevState => prevState + 1);
                setScore(prevState => validateScore(prevState + 1))
                break;
            case 'NEUTRAL':
                setNeutral(prevState => prevState + 1);
                setTotal(prevState => prevState + 1);
                setScore(prevState => validateScore(prevState));
                break;
            case 'BAD':
                setBad(prevState => prevState + 1);
                setTotal(prevState => prevState + 1);
                setScore(prevState => validateScore(prevState - 1));
                break;
            default:
                return 'unknown type';
        }
    }

    return (
      <div>
        <h1>give feedback</h1>
        <div>
            <Button onClick={() => handleClick({type: 'GOOD'})} text='good'/>
            <Button onClick={() => handleClick({type: 'NEUTRAL'})} text='neutral'/>
            <Button onClick={() => handleClick({type: 'BAD'})} text='bad'/>
        </div>
          <h2>statistics</h2>
          {
              feedback ?
                  <Statistics statistics={{good, neutral, bad, total, averageScore, positivePercentage}}/> :
                  <p>No feedback given</p>
          }
      </div>
  );
}

export default App;
