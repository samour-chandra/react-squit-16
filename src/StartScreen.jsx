
function StartScreen({numQuestions}) {
  return (
    <div className="start">
      <h2>Wellcome to the react quiz!</h2>
      <h3>{numQuestions} questions have to test your react mastery</h3>
      <button className="btn btn-ui">Let,s start</button>
    </div>
  );
}

export default StartScreen;