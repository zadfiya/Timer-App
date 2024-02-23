import Button from './UI/Button.tsx';
import {useTimerContext} from '../Context/timer-context.tsx'

export default function Header() {
  const timerctx = useTimerContext();
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={timerctx.isRunning ? timerctx.stopTimer : timerctx.startTimer}>{timerctx.isRunning ? 'Stop' : 'Start'} Timer</Button>
    </header>
  );
}
