/**
 * These are the topics in the form. 
 * Add both positive and negative options with a score. Negative scores help balance the outcome, 
 * and also prevent offers to pass as good for you when some points are totally unattractive to you.
 * Add things you are commonly asked from you but a) you're not interested or b) you don't have the 
 * experience! 
 * 
 * The isPriority flag allows you to indicate a specific item within a topic that holds higher significance 
 * or priority for you compared to other items in the same topic. This flag helps convey your preferences more 
 * accurately to potential job offer senders.
 * 
 * As an example, let's say you have a "job type" topic with three items: "Software Development 100%", "Tech Lead", 
 * and "Managing". The "Managing" item has a higher score and is marked as a priority by setting isPriority to 
 * true. This signifies that the "Managing" option aligns more closely with your preferences and holds greater 
 * importance to you.
 * 
 * By setting an item as a priority, you indicate that it stands out from the other options within the topic. 
 * If someone is describing a job offer to you and selects both the second ("Tech Lead") and third ("Managing") options, 
 * it would not make sense since these options are mutually exclusive. In such a case, the score of the priority 
 * item (i.e., "Managing") is the only relevant score for you, reflecting your preference accurately.
 * 
 * This is the object structure:
 * 
  type TopicItem = {
    title: string;
    key: string; // it's important that this is unique!
    description: string;
    score: number; // Can be positive or negative. Having zero here is missleading ;)
    isPriority?: boolean; // As explained above
  };

  type Topic = {
    label: string; // This is visible in the topic menu
    key: string; // this should be unique!
    items: TopicItem[];
  };
 *
 */

const topics = [
  /*
  // Sample object
  {
    label: "Topic Example",
    key: "unique_key",
    items: [
      {
        title: "Option I don't like",
        key: "dont_like",
        description:
          "Describe the option here",
        score: -2,
      },
      {
        title: "Option I could be okay with",
        key: "could_be",
        description: "Describe the option here",
        score: 5,
      },
      {
        title: "Option I love!",
        key: "yes_please",
        description: "Where do I sign?",
        score: 15,
        isPriority: true // optional, but I would put it to specify that choosing this gets you closer to a match!
      },
    ],
  },
  */
];

export default topics;
