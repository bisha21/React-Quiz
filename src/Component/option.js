import React from "react";

export default function Option({ question, dispatch, answer }) {
  const handleAnswered = answer!==null;
    return (
    <div className="options" question={question}>
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${
            index === answer ? "answer" : ""
          } ${
            handleAnswered ?
            index === question.correctOption ? "correct" : "wrong"
            : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
