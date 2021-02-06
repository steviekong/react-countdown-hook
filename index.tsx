import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useCountDown from "./src/index";

const App = () => {
  const [time, settime] = useState<boolean>(true);
  const [timeleft, { start, reset, pause }] = useCountDown({
    startTimeMilliseconds: 6000,
    interval: 500,
    onCountDownEnd: () => {
      console.log("ended");
    },
  });

  return (
    <>
      <div></div>
      {time && (
        <div>
          <p>
            {" "}
            {timeleft.milliseconds} {timeleft.seconds} {timeleft.minutes}{" "}
            {timeleft.hours} {timeleft.days}
            <button onClick={start}>start</button>
            <button onClick={reset}>reset </button>
            <button onClick={pause}>pause</button>
          </p>
        </div>
      )}
      <button onClick={() => settime(!time)}>unmount</button>
    </>
  );
};

const MOUNT_NODE = document.getElementById("react-root");
ReactDOM.render(<App />, MOUNT_NODE);
