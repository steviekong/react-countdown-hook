import React, { useEffect } from "react"

/** Return possible actions */
type CountDownActions = {
  start: () => void;
  pause: () => void;
  reset: () => void;
}

/** Countdown values to update and return, used as the initial state */
type CountdownValues = {
   milliseconds: number;
   seconds: number;
   minutes: number;
   hours: number;
   days: number;
}

/** Input type */
type CountDownInput = {
  /** Start time in milliseconds */
  startTimeMilliseconds: number;
  /** interval */
  interval: number,
  /** Optional callback when the countdown reaches 0 */
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
    if(timeLeftState.milliseconds > 0 && !timerRunning){
      setTimerRunning(true);
    }
  }
  
  const pause = (): void => {
    setTimerRunning(false);
  }

  const reset = async (): Promise<void> => {
    setTimerRunning(false);
    setTimeLeftState({
      milliseconds: startTimeMilliseconds,
      seconds: Math.floor(startTimeMilliseconds / 1000),
      minutes: Math.floor(startTimeMilliseconds / (60 * 1000)),
      hours: Math.floor(startTimeMilliseconds / (60 * 60 * 1000)),
      days: Math.floor(startTimeMilliseconds / (24 * 60 * 60 * 1000)),
    })
  }

  const countdown = () : NodeJS.Timeout => {
    return  setTimeout(() => (setTimeLeftState({
      milliseconds: timeLeftState.milliseconds - interval,
      seconds: (timeLeftState.milliseconds - interval) / 1000 > 0 ? Math.round((timeLeftState.milliseconds - interval) / 1000): 0,
      minutes: Math.round((timeLeftState.milliseconds - interval) / (60 * 1000)),
      hours: Math.round((timeLeftState.milliseconds - interval)  / (60 * 60 * 1000)),
      days: Math.round((timeLeftState.milliseconds - interval) / (24 * 60 * 60 * 1000)),
    })), interval);
  }

  useEffect(() => {
    let clear : null | NodeJS.Timeout = null;
    if(timerRunning){
      clear = countdown();
    }
    return () => {
      clearTimeout(clear);
    }
  },[timeLeftState, timerRunning])

  useEffect((): void => {
    if(timeLeftState.milliseconds <= 0){
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
  }]
}

export default useCountDown;
 