import { useQuestion } from "../contexts/QuestionContext";

function Options() {
  const { questions, index, dispatch, answer } = useQuestion();
  return (
    <div className="options">
      {questions[index].options.map((option, itemIndex) => (
        <button
          key={option}
          className={`btn btn-option ${itemIndex === answer ? "answer" : ""} ${
            answer !== null
              ? questions[index].correctOption === itemIndex
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: itemIndex })}
          disabled={answer !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
