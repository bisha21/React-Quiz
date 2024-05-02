import React, { useEffect } from 'react'

export default function Timer({dispatch,secondsRemaining}) {
    const mins =Math.floor(secondsRemaining/60)
    const seconds=secondsRemaining%60;
  useEffect(function(){
    const id=setInterval(function() 
{dispatch({type:"tick"})


},1000);
return ()=>clearInterval(id);

  },[dispatch])
  
    return (
    <div className='timer'><strong>{mins<10 && "0"}{mins}:{mins<10 && "0"}{seconds}</strong></div>
  )
}
