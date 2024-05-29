import React, { useState, useEffect } from "react"

const TriviaQuestions = ({
  questions,
  decodeUrl,
  fetchQuestions,
  setLoading,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  const handleAnswerChange = (answer) => {
    setSelectedAnswer(answer)
  }

  const handleSubmit = (question) => {
    if (selectedAnswer === question.correct_answer) {
      console.log(`correct, ${question.correct_answer}`)
    } else {
      console.log(`incorrect, it was ${question.correct_answer}`)
    }
  }

  const handleSkip = async () => {
    setLoading(true)
    await fetchQuestions()
    setLoading(false)
  }

  return (
    <div>
      <h1>Trivia Questions</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{decodeUrl(question.question)}</p>
          <p>Difficulty: {decodeUrl(question.difficulty)}</p>
          <p>Category: {decodeUrl(question.category)}</p>
          <ul>
            {question.incorrect_answers.map((answer, i) => (
              <li key={i}>
                <input
                  type="radio"
                  id={answer}
                  name="answer"
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={() => handleAnswerChange(answer)}
                />
                <label htmlFor={answer}>{decodeUrl(answer)}</label>
              </li>
            ))}
            <li>
              <input
                type="radio"
                id={question.correct_answer}
                name="answer"
                value={question.correct_answer}
                checked={selectedAnswer === question.correct_answer}
                onChange={() => handleAnswerChange(question.correct_answer)}
              />
              <label htmlFor={question.correct_answer}>
                {decodeUrl(question.correct_answer)}
              </label>
            </li>
          </ul>
          <button onClick={() => handleSubmit(question)}>Submit</button>
          <button onClick={handleSkip}>Skip</button>
        </div>
      ))}
    </div>
  )
}

export default TriviaQuestions
