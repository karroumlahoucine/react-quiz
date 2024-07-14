import { useQuestion } from "../contexts/QuestionContext";

function FinishedScreen() {
  const { highScore, dispatch, points, maxPoints } = useQuestion();
  const percentage = Math.ceil((points / maxPoints) * 100);
  let emoji;
  if (percentage === 100) emoji = "🛩";
  if (percentage <= 50 && percentage < 100) emoji = "🏍";
  if (percentage > 0 && percentage < 50) emoji = "🚲";
  if (percentage === 0) emoji = "🛴";

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {maxPoints} (
        {percentage}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
