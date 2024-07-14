import { useQuestion } from "../contexts/QuestionContext";
import Options from "./Options";
function Question() {
  const { questions, index } = useQuestion();
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options />
    </div>
  );
}

export default Question;
