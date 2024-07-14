import { useQuestion } from "../contexts/QuestionContext";

function Progress() {
  const { index, points, answer, numQuetions, maxPoints } = useQuestion();
  return (
    <header className="progress">
      <progress max={numQuetions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {numQuetions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
