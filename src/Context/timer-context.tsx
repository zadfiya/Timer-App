import { type ReactNode, createContext, useContext, useReducer } from "react";

export type Timer = {
    name:string;
    duration:number
};
type TimerState = {
    isRunning:boolean;
    timer:Timer[]
}

type TimerContextValue = TimerState & {
    addTimer : (timerData : Timer) => void,
    startTimer: () => void,
    stopTimer : () => void,
    removeTimer :(id : string) => void
}
type StartTimerProp = {
    type : "START_TIMER"
}
type StopTimerProp = {
    type : "STOP_TIMER"
}
type AddTimerProp = {
    type : "ADD_TIMER"
    payload: Timer
}
type RemoveTimerProp = {
    type : "REMOVE_TIMER"
    id: string
}

type Action = StartTimerProp | StopTimerProp | AddTimerProp | RemoveTimerProp

const TimerContext = createContext<TimerContextValue | null>(null);
type TimerContextProviderProps = {
    children: ReactNode;
}
export function useTimerContext() {
    const timerCTX = useContext(TimerContext);
    if(timerCTX === null)
        throw new Error("null context");

    return timerCTX;
}
const initialState:TimerState = {
    isRunning:false,
    timer:[]
}

const timeReducer = (state:TimerState,action:Action) : TimerState=>{
    if(action.type=="START_TIMER")
    {
        return {...state,
            isRunning : true
        }
    }

    if(action.type=="STOP_TIMER")
    {
        return {
            ...state,
            isRunning:false
        }
    }

    if(action.type=="ADD_TIMER")
    {
        return{
            ...state,
            timer:[...state.timer, action.payload],
        } 
    }

    if(action.type=="REMOVE_TIMER")
    {
        return {
            ...state,
            timer: state.timer.filter(item=>item.name!=action.id)
        }
    }

    return state;
}

export default function TimerContextProvider({children}:TimerContextProviderProps){
    const [timerState, dispatch] = useReducer(timeReducer, initialState)

    const ctx : TimerContextValue ={
        timer: timerState.timer,
        isRunning:timerState.isRunning,
        addTimer(timerData:Timer){
            dispatch({type:'ADD_TIMER', payload:timerData})
        },
        startTimer(){
            dispatch({type:'START_TIMER'})
        },
        stopTimer()
        {
            dispatch({type:'STOP_TIMER'})
            console.log("stopTimer")
        },
        removeTimer(id:string)
        {
            dispatch({type:'REMOVE_TIMER',id})
        }
    }
    return (
        <TimerContext.Provider value={ctx} >
            {children}
        </TimerContext.Provider>
    )
}