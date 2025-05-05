"use client";

import { useState, useEffect } from "react";
import { zeroPad } from "react-countdown";
import { CountdownWrapper, CountdownElementWrapper } from "./CountDown.style";

/**
 * Renders each element (days, hours, minutes, seconds) of the countdown
 */
const CountdownElement = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
  ...props
}) => {
  if (completed) {
    return (
      <CountdownElementWrapper className="countdown_wrapper" {...props}>
        <div className="count_number">Countdown completed</div>
      </CountdownElementWrapper>
    );
  }
  return (
    <CountdownElementWrapper className="countdown_wrapper" {...props}>
      <div className="count_number">
        {zeroPad(days)} <span className="label">D</span>
      </div>
      <div className="count_number">
        {zeroPad(hours)} <span className="label">H</span>
      </div>
      <div className="count_number">
        {zeroPad(minutes)} <span className="label">M</span>
      </div>
      <div className="count_number">
        {zeroPad(seconds)} <span className="label">S</span>
      </div>
    </CountdownElementWrapper>
  );
};

/**
 * The main Countdown component:
 *  - Shows stable placeholders during SSR (and before hydration)
 *  - After hydration, displays the real countdown
 */
const Countdown = ({ date, ...props }) => {
  const [showRealCountdown, setShowRealCountdown] = useState(false);

  useEffect(() => {
    // Only render the actual countdown on the client to avoid SSR mismatch
    setShowRealCountdown(true);
  }, []);

  if (!showRealCountdown) {
    // Render a placeholder so the server's HTML matches the initial client HTML
    return (
      <CountdownElementWrapper className="countdown_wrapper" {...props}>
        <div className="count_number">
          -- <span className="label">D</span>
        </div>
        <div className="count_number">
          -- <span className="label">H</span>
        </div>
        <div className="count_number">
          -- <span className="label">M</span>
        </div>
        <div className="count_number">
          -- <span className="label">S</span>
        </div>
      </CountdownElementWrapper>
    );
  }

  // After hydration, show the real countdown from react-countdown
  return <CountdownWrapper date={date} renderer={CountdownElement} {...props} />;
};

export default Countdown;
