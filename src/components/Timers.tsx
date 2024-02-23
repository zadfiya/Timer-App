import {useTimerContext} from "../Context/timer-context"
import Timer from "./Timer";

export default function Timers() {
  const timerctx = useTimerContext();
  return <ul>{ timerctx.timer.map(timer=><li key={timer.name} ><Timer {...timer} removeTimer={(id)=>timerctx.removeTimer(id)}></Timer></li>)}</ul>;
}
