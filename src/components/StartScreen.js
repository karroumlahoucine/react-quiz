import { useQuestion } from "../contexts/QuestionContext";

function StartScreen() {
  const { numQuetions, dispatch } = useQuestion();
  return (
    <div className="start">
      <h2>Welecome to The React Quiz!</h2>
      <h3>{numQuetions} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
