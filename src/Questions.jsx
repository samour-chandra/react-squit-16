import OptionsItems from "./components/OpitonsItems";

function Questions({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <OptionsItems
        question={question}
        dispatch={dispatch}
        answer={answer}
      />
    </div>
  );
}

export default Questions;
