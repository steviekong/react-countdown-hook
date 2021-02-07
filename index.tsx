import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useCountDown from "./src/index";

const App: React.FunctionComponent = () => {
  const [
    { milliseconds, seconds, minutes, hours, days },
    { start, reset, pause },
  ] = useCountDown({
    // Start time in milliseconds
    startTimeMilliseconds: 6000,
    // Decrement to update the timer with
    interval: 500,
    // Callback triggered when the timer hits 0
    onCountDownEnd: () => {
      console.log("ended");
    },
  });

  return (
    <>
      <div>
        <p>
          Milliseconds: {milliseconds} Second: {seconds} Minute: {minutes}
          Hours: {hours} Days: {days}
          <button onClick={start}>start</button>
          <button onClick={reset}>reset </button>
          <button onClick={pause}>pause</button>
        </p>
      </div>
    </>
  );
};

const MOUNT_NODE = document.getElementById("react-root");
ReactDOM.render(<App />, MOUNT_NODE);
