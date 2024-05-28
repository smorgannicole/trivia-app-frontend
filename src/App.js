import React, { useState, useEffect, useCallback } from "react"
import "./App.css"
import Home from "./pages/Home"
import { Route, Routes } from "react-router-dom"
import TriviaQuestions from "./pages/TriviaQuestions"

const App = () => {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const decodeUrl = (encodedString) => {
    return decodeURIComponent(encodedString)
  }

  const fetchQuestions = useCallback(async (retry = 0) => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&encode=url3986"
      )
      if (response.status === 429) {
        if (retry < 3) {
          setTimeout(() => {
            fetchQuestions(retry + 1)
          }, 3000)
        } else {
          throw new Error("Too many requests")
        }
      } else if (!response.ok) {
        throw new Error("Something went wrong")
      } else {
        const data = await response.json()
        setQuestions(data.results)
        setLoading(false)
      }
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchQuestions()
  }, [fetchQuestions])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/questions"
        element={
          <TriviaQuestions questions={questions} decodeUrl={decodeUrl} />
        }
      />
    </Routes>
  )
}

export default App
