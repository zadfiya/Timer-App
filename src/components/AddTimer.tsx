import { useRef } from 'react';

import Button from './UI/Button.tsx';
import Form, { FormHandle } from './UI/Form.tsx';
import Input from './UI/Input.tsx';
import { useTimerContext } from '../Context/timer-context.tsx'
export default function AddTimer() {
  const form = useRef<FormHandle>(null);
  const timerctx = useTimerContext();

  function handleSaveTimer(data: unknown) {
    const extractedData = data as { name: string; duration: string };
    timerctx.addTimer({name:extractedData.name , duration:+extractedData.duration})
    form.current?.clear();
  }

  return (
    <Form ref={form} onSave={handleSaveTimer} id="add-timer">
      <Input type="text" label="Name" id="name" />
      <Input type="number" label="Duration" id="duration" />
      <p>
        <Button>Add Timer</Button>
      </p>
    </Form>
  );
}
