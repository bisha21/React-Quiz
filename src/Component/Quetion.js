import React from 'react'
import Option from './option'

export default function Quetion({question,dispatch,answer}) {
    console.log(question)
  return (
    <div>
        <h4>{question.question}</h4>
       <Option question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
}
