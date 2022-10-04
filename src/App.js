import { useState } from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - is ... ?',
    variants: ['library', 'framework', 'application'],
    correct: 0,
  },
  {
    title: 'Component - is ... ?',
    variants: ['application', 'part of application or web-page', 'that i dont know what it is'],
    correct: 1,
  },
  {
    title: 'What is JSX?',
    variants: [
      'It is just a pure HTML',
      'It is function',
      'The same HTML but with an opportunity pasting JS code',
    ],
    correct: 2,
  },
];

function Result({correct}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>You have guessed a {correct} answers of {questions.length}</h2>
      <a href="/">
      <button>Try again</button>
      </a>
    </div>
  );
}

function Game({question, onClickVariant, step}) {
  let percentage = Math.round((step / questions.length) * 100);
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {
          question.variants.map((text, index) => (
            <li key={text} onClick={()=>onClickVariant(index)}>{text}</li>
          ))
        }
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const question = questions[step];

  const onClickVariant = (index) => {
    setStep(step + 1);
    if(index == question.correct){
      setCorrect(correct + 1);
    }
  }
  return (
    <div className="App">
      
      {
        step !== questions.length ? <Game step={step} question={question} onClickVariant={onClickVariant}/>
         :
        <Result correct={correct}/>
      }
    </div>
  );
}

export default App;
