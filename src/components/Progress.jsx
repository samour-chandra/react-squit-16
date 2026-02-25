function Progress({ index, numQustions,points ,totalPoints}) {
  return (
    <header className="progress">
        <progress max={numQustions} value={index}/>
      <p>
        Questions <strong>{index + 1}</strong>/{numQustions}
      </p>
      <p>
        Points <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
