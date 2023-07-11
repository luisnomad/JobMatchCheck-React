/**
 * Retrieves a JSX element based on the provided parameters.
 *
 * @param {boolean} isMatch - Indicates whether there is a match.
 * @param {number} percentage - The percentage value.
 * @returns {JSX.Element} The JSX element representing the copy.
 */
const getCopy = (isMatch, percentage) => {
  if (isMatch) {
    return (
      <>
        I would love to hear about your opportunity! Please, go to the{" "}
        <a href="#">Contact page</a> and let's start a conversation!
      </>
    );
  }

  /**
   * The copy for each percentage, as well as the thresholds for each message
   * are entirely up to you!
   * */
  if (percentage <= 25) {
    return (
      <>
        Let's find out if <b className="font-bold"> we </b> are a match before
        discussing a professional opportunity! Go through the following topics
        and select the check boxes of the options that best describe your
        requirements and the selection process. At the end, you'll immediately
        know if we're a match!
      </>
    );
  }

  if (percentage > 25 && percentage <= 60) {
    return (
      <>
        Keep going! Don't forget to review all the <b> topics </b>. If you have
        selected all applicable options, it means that your offer is not for me.
      </>
    );
  }

  if (percentage > 60 && percentage <= 70) {
    return (
      <>
        Your offer sounds promissing, but we're not quite there yet. If you have
        chosen all the possible options, it looks like we're not a match at this
        time!
      </>
    );
  }

  if (percentage > 70 && percentage <= 82) {
    return (
      <>
        Your offer sounds promissing, but we're not quite there yet. If you have
        chosen all the possible options, it looks like we're not a match at this
        time!
      </>
    );
  }
  if (percentage > 82 && percentage < 100) {
    return (
      <>
        Looks like we aren't a total match yet, keep selecting options! Or if
        you're done, maybe <a href="#">contact me</a> to iron out the remaining
        details?
      </>
    );
  }
};

// Title of the page when a dealbreaker score has been reached
export const DEALBREAKER_TITLE = "No match 👎🏻";
// Copy when a dealbreaker score has been reached
export const DEALBREAKER_COPY = "Looks like we're not meant for each other...";

export default getCopy;
