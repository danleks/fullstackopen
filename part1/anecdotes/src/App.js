import { useEffect, useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [votesStatistics, setVotesStatistics] = useState({});
  const [anecdoteWithMostVotes, setAnecdoteWithMostVotes] = useState({
    index: 0,
    value: 0,
  });

  const handleRandomIndex = (max) => {
    const randomIndex = Math.floor(Math.random() * max);
    setSelected(randomIndex);
  };

  const createVotesStatistics = () => {
    setVotesStatistics(
      [...new Set(anecdotes)].reduce((acc, curVal, curIndex) => {
        acc[curIndex] = 0;
        return acc;
      }, {})
    );
  };

  const handleVote = () => {
    const copy = { ...votesStatistics };
    copy[selected]++;
    setVotesStatistics(copy);
  };

  const getAnecdoteOfWithMostViews = () => {
    for (let key in votesStatistics) {
      if (anecdoteWithMostVotes.value < votesStatistics[key]) {
        setAnecdoteWithMostVotes({
          index: +key,
          value: votesStatistics[key],
        });
      }
    }
  };

  useEffect(() => {
    createVotesStatistics();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getAnecdoteOfWithMostViews();
  }, [votesStatistics]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votesStatistics[selected]} votes</p>
      </div>
      <div>
        <button onClick={() => handleVote()}>vote</button>
        <button onClick={() => handleRandomIndex(anecdotes.length)}>
          next anecdote
        </button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[anecdoteWithMostVotes.index]}</p>
      </div>
    </div>
  );
};

export default App;
