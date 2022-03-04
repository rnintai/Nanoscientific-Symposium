import React, { useState, useEffect } from "react";
import { TimerContainer } from "./TimerStyles";

interface TimerProps {
  second: number;
  setIsExpired: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer = ({ second, setIsExpired }: TimerProps) => {
  const [timeRemained, setTimeRemained] = useState<number>(second);
  const minuteRemained = Math.floor(timeRemained / 60);
  const secondRemained = Math.floor(timeRemained % 60);
  const [intervalState, setIntervalState] = useState<NodeJS.Timer>();

  useEffect(() => {
    setIntervalState(
      setInterval(() => {
        setTimeRemained((timeRemained) => timeRemained - 1);
      }, 1000),
    );
  }, []);

  useEffect(() => {
    if (intervalState && timeRemained < 1) {
      clearInterval(intervalState);
      setIsExpired(true);
    }
  }, [timeRemained]);

  return (
    <TimerContainer>
      {timeRemained >= 0 && (
        <span>
          {minuteRemained}:
          {secondRemained < 10 ? `0${secondRemained}` : secondRemained}
        </span>
      )}
    </TimerContainer>
  );
};

export default Timer;
