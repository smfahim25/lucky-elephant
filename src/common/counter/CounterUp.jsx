import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

const CounterUp = ({ className, start, end, duration }) => {
  const [isVisible, setIsVisible] = useState(false);
  const countUpRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the component is visible
    };

    const handleIntersection = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    observer.observe(countUpRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <span ref={countUpRef}>
      {isVisible && (
        <CountUp
          className={className}
          start={start}
          end={end}
          duration={duration}
        />
      )}
    </span>
  );
};

export default CounterUp;
