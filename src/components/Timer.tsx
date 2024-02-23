import Container from './UI/Container.tsx';
import { Timer as TimerProps, useTimerContext} from '../Context/timer-context.tsx'
import Button from './UI/Button.tsx';
import { useEffect, useState, useRef } from 'react';
type TimerFunctionProps = {
  removeTimer:(id:string)=>void
}
export default function Timer({name, duration, removeTimer}:TimerProps & TimerFunctionProps) {
  const [remainingTime, setRemainingTime] = useState<number>(duration*1000);
  const interval = useRef<number | null>(null);
  const timerctx = useTimerContext();
  const {isRunning} = timerctx;
  
  if(remainingTime<=0)
  {
    clearInterval(interval.current!)
  }

  const runTimer = () =>{
    const timer = setInterval(()=>{
      setRemainingTime((prevState)=>prevState - 50)
    },50);
    interval.current = timer;
  }

  useEffect(()=>{
    const timer = interval.current!

    return ()=>clearInterval(timer);
  },[isRunning])
  
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p><progress max={duration*1000} value={remainingTime} />{(remainingTime/1000).toFixed(0)}</p>
      <div style={{display:'flex', justifyContent:'center', gap:'10px'}}>
        <Button onClick={()=>runTimer()}>Run timer</Button>
        <Button onClick={()=>removeTimer(name)}> Remove Timer</Button>
      </div>
    </Container>
  );
}
