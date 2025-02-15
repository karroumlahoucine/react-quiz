import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import NextButton from "./NextButton";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Footer from "./Footer";
import Timer from "./Timer";
import FinishedScreen from "./FinishedScreen";
import { useQuestion } from "../contexts/QuestionContext";

export default function App() {
  const { status } = useQuestion();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishedScreen />}
      </Main>
    </div>
  );
}
