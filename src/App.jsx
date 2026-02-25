import { act, useEffect, useReducer } from "react";
import Header from "./Header";
import MainQuiz from "./MainQuiz";
import Loader from "./Loader";
import ErrorMessage from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
const initialState = {
  questions: [],
  // loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      console.log(question);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "newQuestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("Unknown action");
  }
}
function App() {
  const [{ status, questions, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc,num)=> acc + num.points,0)

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <MainQuiz>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQustions={numQuestions}
              points={points}
              totalPoints={totalPoints}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </MainQuiz>
    </div>
  );
}

export default App;
