import "./ProgressBar.css";

/**
 * The progress bar goes, as you would expect, from 0 to 100.
 * It will look "red" on the left and "green" on the right,
 * with more green than red as the percentage increases.
 * You can change these colors if you want, but think of red and green
 * as a concept, with red being "promissing" and green being "not promissing".
 */
export const red = "red";
export const green = "#2ba163";

/**
 * Creates a progress bar component.
 *
 * @param {number} props.value - The current score.
 * @param {number} props.max - The maximum score that can be reached.
 * @return {JSX.Element} The rendered progress bar component.
 */
const ProgressBar = ({ value = 0, max = 0 }) => {
  // Calculate the percentage of the progress
  let normalizedValue = value < 0 ? 0 : value;
  if (normalizedValue > max) normalizedValue = max;
  const percentageValue = (normalizedValue / max) * 100;

  // Determine the background color based on the percentage
  const getColor = () => {
    if (percentageValue === 0) {
      return red;
    } else if (percentageValue === 100) {
      return green;
    } else {
      const redValue = Math.round(255 - (percentageValue / 100) * 255);
      const greenValue = Math.round((percentageValue / 100) * 255);
      return `linear-gradient(90deg, ${red}, rgb(${redValue}, ${greenValue}, 0), ${green})`;
    }
  };

  // Create the style object for the progress bar
  const barStyle = {
    width: `${percentageValue}%`,
    background: getColor(),
    transition: "width 0.5s, background-color 0.5s",
  };

  return (
    <div className="progress-bar">
      <div className="progress-bar__bar" style={barStyle}></div>
    </div>
  );
};

export default ProgressBar;
