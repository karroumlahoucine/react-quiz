import { createContext, useContext, useEffect, useReducer } from "react";

const questionsContext = createContext();

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * 30,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      const correctAnswer = question.correctOption;
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === correctAnswer
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index++, answer: null };
    case "finish":
      const score =
        state.highScore > state.points ? state.highScore : state.points;
      return { ...state, highScore: score, status: "finished" };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        highScore: state.highScore,
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        status: state.secondRemaining === 0 ? "finished" : state.status,
        secondRemaining: state.secondRemaining - 1,
      };
    default:
      throw new Error("Unkonwn action");
  }
}

function QuestionProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuetions = questions.length;
  const maxPoints = questions.reduce((prev, acc) => prev + acc.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <questionsContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondRemaining,
        dispatch,
        numQuetions,
        maxPoints,
      }}
    >
      {children}
    </questionsContext.Provider>
  );
}

function useQuestion() {
  const value = useContext(questionsContext);
  if (value === undefined) {
    throw new Error("The context was used outside the question provider");
  }
  return value;
}

export { QuestionProvider, useQuestion };
