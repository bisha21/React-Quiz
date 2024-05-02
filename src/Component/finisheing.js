import React from 'react'

export default function FinishedScreen({maxPossiblePoits,points,highscore,dispatch}) {
   const percentage=Math.ceil((points/maxPossiblePoits)*100);
   let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

    return (
    <>
<p className='result'> <span>{emoji}</span> You score <strong>{points}</strong >
out of {maxPossiblePoits} ({percentage}%)</p>
<p className="highscore">(Highscore: {highscore} points)</p>

       <p className="highscore">(Highscore: {highscore} points)</p>
       return (
    <button className='btn btn-ui'
    onClick={()=>dispatch({type:"restart"})}>Restart</button>
  
    </>
  )
}
