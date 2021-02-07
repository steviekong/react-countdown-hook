# Better React Countdown Hook

Super simple and lightweight countdown timer hook with most of the functionality you would need.

Built with typescript :)

The aim of the library is to remain as small as possible.

## Installation

Using npm:

```bash
$ npm install --save react-better-countdown-hook
```

Using yarn:

```bash
$ yarn add react-better-countdown-hook
```

## Quick Start/ Example

```js
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useCountDown from "react-better-countdown-hook";

const App: React.FunctionComponent = () => {
  const [
    { milliseconds, seconds, minutes, hours, days },
    { start, reset, pause },
  ] = useCountDown({
    // Start time in milliseconds
    startTimeMilliseconds: 6000,
    // Decrement to update the timer with
    interval: 500,
    // Callback triggered when the timer reaches 0
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
```

## Documentation

```js
const [
  /** Time in milliseconds, seconds, minutes, hours, days */
  { milliseconds, seconds, minutes, hours, days },
  { start, reset, pause },
] = useCountDown({
  // Start time in milliseconds
  startTimeMilliseconds: 6000,
  // Decrement to update the timer with
  interval: 500,
  // Callback triggered when the timer reaches 0
  onCountDownEnd: () => {
    console.log("ended");
  },
});
```

## Configuration

| Property              | Type     | Is Optional | Description                                  |
| --------------------- | -------- | ----------- | -------------------------------------------- |
| milliseconds          | number   | true        | Current timer value in milliseconds          |
| seconds               | number   | true        | Current timer value in seconds               |
| minutes               | number   | true        | Current timer value in minutes               |
| hours                 | number   | true        | Current timer value in hours                 |
| days                  | number   | true        | Current timer value in days                  |
| start                 | function | true        | Function to start the timer                  |
| pause                 | function | true        | Function to pause/stop the timer             |
| reset                 | function | true        | Function to pause and then reset the timer   |
| startTimeMilliseconds | number   | false       | Start time of the timer in milliseconds      |
| interval              | number   | false       | Value to decrement                           |
| onCountDownEnd        | function | true        | Callback to trigger when the timer reaches 0 |

## License

MIT
