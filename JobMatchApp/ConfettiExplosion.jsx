import React, { useEffect, useState } from "react";
import "./ConfettiExplosion.css";

const ConfettiExplosion = () => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const container = document.getElementById("confetti-container");

    const createConfetti = () => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";

      const size = Math.floor(Math.random() * 10) + 5;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;

      const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.backgroundColor = color;

      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.style.animationDelay = `${Math.random() * 5}s`;

      confetti.addEventListener("animationend", () => {
        container.removeChild(confetti);

        // Check if the container is empty and fading out is enabled
        if (container.childElementCount === 0 && isFadingOut) {
          // Fade out the container gradually
          container.style.transition = "opacity 2s";
          container.style.opacity = "0";

          // Remove the container from the DOM after fade animation completes
          setTimeout(() => {
            container.parentNode.removeChild(container);
          }, 2000);
        }
      });

      container.appendChild(confetti);
    };

    const interval = setInterval(createConfetti, 50);

    // Stop generating new confetti after 10 seconds
    setTimeout(() => {
      setIsFadingOut(true);
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div id="confetti-container"></div>;
};

export default ConfettiExplosion;
