import React, { useState } from "react";
import ProgressBar, { red, green } from "./ProgressBar.jsx";
import ConfettiExplosion from "./ConfettiExplosion.jsx";
import topics from "./data/topics.js";
import getCopy, { DEALBREAKER_TITLE, DEALBREAKER_COPY } from "./data/copy.jsx";
import "./MatchForm.css";

// When this threshold is reached, we show a "dealbreaker" title and copy.
const DEALBREAKER_SCORE = -10;
// How many items should be selected before you can consider an offer to be promissing?
const EXPECTED_ITEMS_TO_BE_PROMISSING = 2;
// What's a percentage you'd consider promissing? (0 to 100)
const PROMISSING_IN_PERCENTAGE = 50;

/**
 * Calculates the maximum value based on the topics list.
 *
 * @param {Array} topicsList - The list of topics.
 * @return {number} The maximum value calculated.
 */
const calculateMaxValue = (topicsList) => {
  let sum = 0;

  for (const topic of topicsList) {
    const priorityItem = topic.items?.find((item) => item.isPriority === true);

    if (priorityItem) {
      sum += priorityItem.score;
      continue;
    }

    topic.items?.forEach((item) => {
      if (item.score > 0) {
        sum += item.score;
      }
    });
  }

  return sum;
};

const maxValue = calculateMaxValue(topics);

export default function MatchForm() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]?.key ?? "");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);

  const isMatch = score >= maxValue;
  let normalizedScore = score < 0 ? 0 : score;
  if (normalizedScore > maxValue) normalizedScore = maxValue;
  const percentage = (normalizedScore / maxValue) * 100;
  const isDealBreaker =
    score < DEALBREAKER_SCORE ||
    (selectedOptions.length > EXPECTED_ITEMS_TO_BE_PROMISSING &&
      percentage < PROMISSING_IN_PERCENTAGE);

  const titleColor = isMatch ? "text-pink" : "text-gray-800 dark:text-white";
  const title = isMatch ? "We ARE a match! 😍" : "Are we a match?";

  const handleClick = (key) => {
    setSelectedTopic(key);
  };

  /**
   * Handle the selection of an item.
   *
   * @param {TopicItem} item - The item to be selected.
   */
  const handleSelect = (item) => {
    const itemChangedKey = item.key;
    const newCheckedState = !selectedOptions.includes(itemChangedKey);

    if (newCheckedState) {
      setSelectedOptions([...selectedOptions, itemChangedKey]);
      setScore(score + +item.score);
    } else {
      setSelectedOptions(
        selectedOptions.filter((str) => str !== itemChangedKey)
      );
      setScore(score - +item.score);
    }
  };

  /**
   * Renders the items based on the selected topic.
   *
   * @return {React.Node[]} An array of React components representing the rendered items.
   */
  const renderItems = () => {
    const selectedTopicObj = topics.find(
      (topic) => topic.key === selectedTopic
    );

    return selectedTopicObj?.items?.map((item, index) => {
      return (
        <React.Fragment key={`key_${index}`}>
          <div className="group pb-8">
            <div
              className="flex items-center focus:outline-none"
              onClick={() => handleSelect(item)}
            >
              <input
                type="checkbox"
                key={item.key}
                title={item.title}
                placeholder={item.title}
                name={item.key}
                className="checkbox cursor-pointer accent-green-200"
                style={{ accentColor: item.score < 0 ? red : green }}
                checked={selectedOptions.includes(item.key)}
                onChange={() => {}}
                value={item.score}
              />

              <h1 className="mx-4 text-xl text-gray-700 dark:text-white text-left flex-1 cursor-pointer">
                <label className="cursor-pointer" htmlFor={item.key}>
                  {item.title}
                </label>
              </h1>
            </div>

            {item.description && (
              <div className="flex mt-8 md:mx-10" style={{ marginLeft: 28 }}>
                <span className="border border-blue-500"></span>

                <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            )}
          </div>
        </React.Fragment>
      );
    });
  };
  /**
   * Render the topic list based on the given topics array.
   *
   * @return {React.Node[]} The rendered topic list.
   */
  const renderTopicList = () =>
    topics.map((topic) => {
      const linkColor =
        selectedTopic === topic.key
          ? "text-gray-500 dark:text-electric"
          : "text-gray-500 dark:text-gray-300";

      const isTopicSelected = topic.items.some((item) =>
        selectedOptions.includes(item.key)
      );

      const checkmark = isTopicSelected ? (
        <span className="ml-1">&#10003;</span>
      ) : null;

      return (
        <button
          key={topic.key}
          className={`topic-button ${linkColor} hover:underline px-4 py-2 mx-2 md:p-0 md:m-0 pointer`}
          onClick={() => handleClick(topic.key)}
        >
          {topic.label}
          {checkmark}
        </button>
      );
    });

  return (
    <React.Fragment>
      <header className="form-header px-6 py-6 mx-auto bg-dark dark:bg-darker">
        <h1 className={`text-2xl font-semibold lg:text-4xl mb-4 ${titleColor}`}>
          {isDealBreaker ? DEALBREAKER_TITLE : title}
        </h1>
        <ProgressBar value={score} max={maxValue} />
        {isMatch && <ConfettiExplosion />}
      </header>
      <section>
        <div className="container px-6 py-4 mx-auto">
          <p className="text-baseline font-light text-gray-800 dark:text-white mt-2">
            {isDealBreaker ? DEALBREAKER_COPY : getCopy(isMatch, percentage)}
          </p>

          <div className="mt-8 xl:mt-16 desktop-flexbox lg:-mx-12">
            <div className="lg:mx-12">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Topics
              </h1>

              <div className="links-container mt-4 space-y-4 lg:mt-8">
                {renderTopicList()}
              </div>
            </div>

            <div className="items-container flex-1 mt-8 lg:mx-12 lg:mt-6">
              {renderItems()}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
