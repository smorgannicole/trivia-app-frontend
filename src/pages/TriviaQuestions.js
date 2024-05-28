import React from "react"

const TriviaQuestions = ({ questions, decodeUrl }) => {
  return (
    <div>
      <h1>Trivia Questions</h1>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <p>{decodeUrl(question.question)}</p>
            <ul>
              <li>Correct Answer: {decodeUrl(question.correct_answer)}</li>
              {question.incorrect_answers.map((answer, i) => (
                <li key={i}>{decodeUrl(answer)}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TriviaQuestions
