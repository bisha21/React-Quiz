import logo from "./logo.svg";
import { useReducer, useEffect } from "react";
import Header from "./Component/Header";
import Error from "./Component/Error";
import Main from "./Component/Main";
import Loader from "./Component/Loader";
import StartScreen from "./Component/StartScreen";
import Quetion from "./Component/Quetion";
import NextButton from "./Component/NextButton";
import Progess from "./Component/Progess";
import FinishedScreen from "./Component/finisheing";
import Footer from "./Footer";
import Timer from "./Timer";
const initialState = {
  questions: [],
  status: "loading..",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining:null
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining:state.questions.length*30
      };

    case "dataFailed":
      console.log("Data is not available");
      break;
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
      case "tick":
        return{
          ...state,
          secondsRemaining:state.secondsRemaining-1,
          status: state.secondsRemaining===0 ? "finished":state.status
        }
    default:
      throw new Error("Action unKnown");
  }
}

function App() {
  const [{ questions, status, index, points, answer, highScore,secondsRemaining}, dispatch] =
    useReducer(reducer, initialState);
  const maxPossiblePoits = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  const numQuestion = questions.length;
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progess
              index={index}
              numQuestions={numQuestion}
              points={points}
              maxPossiblePoits={maxPossiblePoits}
            />
            <Quetion
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer className="footer" >
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestion={numQuestion}
            />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            maxPossiblePoits={maxPossiblePoits}
            points={points}
            highscore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
