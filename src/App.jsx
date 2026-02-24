import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainQuiz from "./MainQuiz";
import Loader from "./Loader";
import ErrorMessage from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
const initialState = {
  questions: [],
  // loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
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
      return { ...state, answer: action.payload };
    default:
      throw new Error("Unknown action");
  }
}
function App() {
  const [{ status, questions, index ,answer}, dispatch] = useReducer(
    reducer,
    initialState,
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  const numQuestions = questions.length;
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
          <Questions
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </MainQuiz>
    </div>
  );
}

export default App;
