function FinishedScreen({ points, totalPoints, highScore }) {
  const parcentage = (points / totalPoints) * 100;
  return (
    <>
      <p className="result">
        you scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(parcentage)}%)
      </p>
      <p className="highscore">(HighScore: {highScore})</p>
    </>
  );
}

export default FinishedScreen;
