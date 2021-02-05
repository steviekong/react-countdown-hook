import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import useCountDown from "./src/index";

const App = () => {
  const [timeleft, { start }] = useCountDown({
    startTimeMilliseconds: 62000,
    interval: 1,
    onCountDownEnd: () => {},
  });

  useEffect(() => {
    start();
  }, []);
  return (
    <div>
      <p>
        {" "}
        {timeleft.milliseconds} {timeleft.seconds} {timeleft.minutes}{" "}
        {timeleft.hours} {timeleft.days}
      </p>
    </div>
  );
};

const MOUNT_NODE = document.getElementById("react-root");
ReactDOM.render(<App />, MOUNT_NODE);
