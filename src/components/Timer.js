import { useEffect } from "react";
import { useQuestion } from "../contexts/QuestionContext";

function Timer() {
  const { dispatch, secondRemaining } = useQuestion();
  const minute = Math.trunc(secondRemaining / 60);
  const second = secondRemaining % 60;
  useEffect(
    function () {
      const intervalId = setInterval(() => dispatch({ type: "tick" }), 1000);
      return () => clearInterval(intervalId);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {minute < 10 && "0"}
      {minute}:{second < 10 && "0"}
      {second}
    </div>
  );
}

export default Timer;
