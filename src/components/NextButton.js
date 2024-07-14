import { useQuestion } from "../contexts/QuestionContext";

function NextButton() {
  const { dispatch, answer, index, numQuetions } = useQuestion();

  if (answer === null) return;
  if (index < numQuetions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numQuetions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
