import React, { useEffect } from "react"

/** Return type of the hook */
type CountDownActions = {
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

/** Countdown values to update, used as the initial state */
type CountdownValues = {
   milliseconds: number;
   seconds: number;
   minutes: number;
   hours: number;
   days: number;
}

/** Input type */
type CountDownInput = {
  startTimeMilliseconds: number;
  interval: number,
  onCountDownEnd: () => any
}

const useCountDown  = ({startTimeMilliseconds,interval, onCountDownEnd}: CountDownInput): [CountdownValues, CountDownActions] => {
  const [timeLeftState, setTimeLeftState] = React.useState<CountdownValues>({
    milliseconds: startTimeMilliseconds,
    seconds: Math.floor(startTimeMilliseconds / 1000),
    minutes: Math.floor(startTimeMilliseconds / (60 * 1000)),
    hours: Math.floor(startTimeMilliseconds / (60 * 60 * 1000)),
    days: Math.floor(startTimeMilliseconds / (24 * 60 * 60 * 1000)),
  })
  const [timerRunning, setTimerRunning] = React.useState<boolean>(false)

  const start = (): void => {
    setTimerRunning(true);
  }
  
  const pause = (): void => {
    setTimerRunning(false);
  }

  const resume = (): void => {
    if(timeLeftState.milliseconds > 0){
      setTimerRunning(true)
    }
    else{
      throw "Timer not started!"
    }
  }

  const reset = (): void => {
    setTimeLeftState({
      milliseconds: startTimeMilliseconds,
      seconds: Math.floor(startTimeMilliseconds / 1000),
      minutes: Math.floor(startTimeMilliseconds / (60 * 1000)),
      hours: Math.floor(startTimeMilliseconds / (60 * 60 * 1000)),
      days: Math.floor(startTimeMilliseconds / (24 * 60 * 60 * 1000)),
    })
  }

  useEffect((): void => {
    if(timerRunning){
      setTimeout(() => (setTimeLeftState({
        milliseconds: timeLeftState.milliseconds - interval,
        seconds: (timeLeftState.milliseconds - interval) / 1000 > 0? Math.floor((timeLeftState.milliseconds - interval) / 1000) + 1 : 0,
        minutes: Math.floor((timeLeftState.milliseconds - interval) / (60 * 1000)),
        hours: Math.floor((timeLeftState.milliseconds - interval)  / (60 * 60 * 1000)),
        days: Math.floor((timeLeftState.milliseconds - interval) / (24 * 60 * 60 * 1000)),
      })), interval)
    }
  })

  useEffect((): void => {
    if(timeLeftState.milliseconds === interval){
      onCountDownEnd()
      pause()
    }
  }, [timeLeftState])

  return [{
    milliseconds: timeLeftState.milliseconds,
    seconds: timeLeftState.seconds,
    minutes: timeLeftState.minutes,
    hours: timeLeftState.hours,
    days: timeLeftState.days,
  },{
    start: start,
    pause: pause,
    reset: reset,
    resume: resume
  }]
}

export default useCountDown;
 