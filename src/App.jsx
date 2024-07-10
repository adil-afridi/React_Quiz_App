firebase loginimport { useState } from "react";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const questionsPerPage = 5;

  const questions = [
    {
      question: "1) What is an array in programming?",
      options: ["Multiple", "Fixed", "Single", "Function"],
      correct: "Fixed",
    },
    {
      question: "2) Which of the following is a valid way to declare an array in PHP?",
      options: ["array()", "[ ]", "values", "All"],
      correct: "All",
    },
    {
      question: "3) How do you access the third element in an array called $fruits in PHP?",
      options: ["$fruits[2]", "$fruits[3]", "third", "$fruits->3"],
      correct: "$fruits[2]",
    },
    {
      question: "4) What is an object in programming?",
      options: ["Function", "Variable", "Instance", "Fixed"],
      correct: "Instance",
    },
    {
      question: "5) How do you create a new object in PHP from a class called Car?",
      options: ["new Car()", "Car()", "create Car()", "new Car"],
      correct: "new Car()",
    },
    {
      question: "6) Which of the following keywords is used to define a class in PHP?",
      options: ["define", "class", "new", "function"],
      correct: "class",
    },
    {
      question: "7) What does the following PHP code do? class Dog { public $name; function __construct($name) { $this->name = $name; } } $dog = new Dog('Rex');",
      options: ["Class", "Object", "Name", "Both"],
      correct: "Both",
    },
    {
      question: "8) Which of the following is a correct way to access a property of an object in PHP?",
      options: ["->property", "::property", "property()", "[property]"],
      correct: "->property",
    },
    {
      question: "9) How do you add an element to an array in PHP?",
      options: ["array_add", "[ ]", "add", "push"],
      correct: "[]",
    },
    {
      question: "10) Which of the following is true about associative arrays in PHP?",
      options: ["Numeric", "Strings", "Types", "Unsupported"],
      correct: "Strings",
    },
  ];

  const handleAnswerOptionClick = (selectedOption, questionIndex) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[questionIndex] = selectedOption;
    setSelectedOptions(updatedSelectedOptions);

    if (selectedOption === questions[questionIndex].correct) {
      setScore(score + 1);
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage * questionsPerPage < questions.length) {
      setCurrentPage(nextPage);
    } else {
      setShowScore(true);
    }
  };

  const startQuestionIndex = currentPage * questionsPerPage;
  const endQuestionIndex = Math.min(startQuestionIndex + questionsPerPage, questions.length);

  return (
    <div className="container">
      <h1>Quiz Application</h1>
      {showScore ? (
        <div className="score-section">
          <h4 style={{marginTop:'20px'}}>You scored {score} out of {questions.length}</h4>
        </div>
      ) : (
        <form>
          {questions.slice(startQuestionIndex, endQuestionIndex).map((question, quesIndex) => {
            const questionIndex = startQuestionIndex + quesIndex;
            return (
              <div className="input" key={questionIndex}>
                <h3>{question.question}</h3>
                <div className="options">
                  {question.options.map((option, index) => (
                    <div key={index} className="option">
                      <input
                        type="radio"
                        name={`question${questionIndex}`}
                        id={`option${questionIndex}-${index}`}
                        value={option}
                        checked={selectedOptions[questionIndex] === option}
                        onChange={() => handleAnswerOptionClick(option, questionIndex)}
                      />
                      <label htmlFor={`option${questionIndex}-${index}`}>{option}</label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="footer">
            <button
              className="nextBtn"
              type="button"
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default App;
