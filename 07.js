const f = require("fs");

/**
 * Get the type of a hand based on the strengths of the cards in the hand.
 * This is the core of the solution.
 * @param {Array} cardStrenghts Strengths of the cards in the hand
 * @param {Boolean} jokers      Are jokers present when calculating the hand type.
 *                              If true, jokers ('J') are treated as wildcards,
 *                              otherwise they are treated as Jacks.
 * @returns {number}            Hand type
 */
const getHandType = (cardStrenghts, jokers = false) => {
  cardStrenghts = jokers ? cardStrenghts.filter((s) => s !== 1) : cardStrenghts;
  const jokersAmount = jokers ? 5 - cardStrenghts.length : 0;
  const sorted = cardStrenghts.sort((a, b) => b - a);

  // Five of a kind (7 points)
  const fiveOfAKind =
    sorted.filter((strength) => strength === sorted[0]).length === 5;
  if (fiveOfAKind) return 7;

  // Four of a kind (6 points)
  const fourOfAKind = sorted.some((strength) => {
    const filtered = sorted.filter((s) => s === strength);
    return filtered.length === 4;
  });
  // 4 of a kind with 1 joker is 7 points
  if (fourOfAKind && jokersAmount >= 1) return 7;
  if (fourOfAKind) return 6;

  // Full house (5 points)
  const fullHouse = sorted.some((strength) => {
    const filtered = sorted.filter((s) => s === strength);
    return (
      filtered.length === 3 &&
      sorted.some((strength) => {
        const filtered = sorted.filter((s) => s === strength);
        return filtered.length === 2;
      })
    );
  });
  // Full house (5 cards) can't have any jokers
  if (fullHouse) return 5;

  // Three of a kind (4 points)
  const threeOfAKind = sorted.some((strength) => {
    const filtered = sorted.filter((s) => s === strength);
    return filtered.length === 3;
  });
  // Three of a kind with 2 jokers can only be five of a kind (7 points).
  // Similarly, 3 of a kind with 1 joker can only be four of a kind (6 points).
  if (threeOfAKind && jokersAmount === 2) return 7;
  if (threeOfAKind && jokersAmount === 1) return 6;
  if (threeOfAKind) return 4;

  // Two pair (3 points)
  const twoPairs = sorted.some((strength) => {
    const firstPair = sorted.filter((s) => s === strength);
    // remove first pair from sorted
    const whatsLeft = sorted.filter((s) => s !== firstPair[0]);
    const hasSecondPair = whatsLeft.some((ws) => {
      const filtered = whatsLeft.filter((s) => s === ws);
      return filtered.length === 2;
    });
    return firstPair.length === 2 && hasSecondPair;
  });
  if (twoPairs && jokersAmount === 1) return 5;
  if (twoPairs) return 3;

  // One pair (2 points)
  const onePair = sorted.some((strength) => {
    const filtered = sorted.filter((s) => s === strength);
    return filtered.length === 2;
  });
  if (onePair && jokersAmount === 3) return 7;
  if (onePair && jokersAmount === 2) return 6;
  if (onePair && jokersAmount === 1) return 4;
  if (onePair) return 2;

  // High card (1 point)
  if (jokersAmount >= 4) return 7;
  if (jokersAmount === 3) return 6;
  if (jokersAmount === 2) return 4;
  if (jokersAmount === 1) return 2;
  return 1;
};

/**
 * Compare two hands based on their type (full house, two pairs, and so on) and
 * in the event of a tie, by their unordered individual card strengths.
 * @param {Object} hand1 Hand 1
 * @param {Object} hand2 Hand 2
 * @returns {number} -1 if hand1 is stronger, 1 if hand2 is stronger
 */
const compareHands = (hand1, hand2) => {
  if (hand1.type < hand2.type) return -1;
  if (hand1.type > hand2.type) return 1;
  for (let i = 0; i < hand1.strengths.length; i++) {
    if (hand1.strengths[i] < hand2.strengths[i]) return -1;
    if (hand1.strengths[i] > hand2.strengths[i]) return 1;
  }
  return 1;
};

const part1 = () => {
  let lines = [];

  const data = f.readFileSync("data/07-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  /**
   * Card strengths when jokers are not present
   */
  const strengths = [
    { card: "A", strength: 14 },
    { card: "K", strength: 13 },
    { card: "Q", strength: 12 },
    { card: "J", strength: 11 },
    { card: "T", strength: 10 },
    { card: "9", strength: 9 },
    { card: "8", strength: 8 },
    { card: "7", strength: 7 },
    { card: "6", strength: 6 },
    { card: "5", strength: 5 },
    { card: "4", strength: 4 },
    { card: "3", strength: 3 },
    { card: "2", strength: 2 },
  ];

  const getHandStrengths = (cards) => {
    const splitted = cards.split("").map((card) => {
      return strengths.find((strength) => strength.card === card).strength;
    });
    return splitted;
  };

  const hands = lines.map((line) => {
    const splitted = line.split(/\s+/);
    return {
      cards: splitted[0],
      bid: parseInt(splitted[1]),
      strengths: getHandStrengths(splitted[0]),
      type: getHandType(getHandStrengths(splitted[0])),
    };
  });

  const sum = hands
    .sort((a, b) => compareHands(a, b))
    .reduce((a, b, i) => a + b.bid * (i + 1), 0);
  console.log("Part 1", sum);
};

const part2 = () => {
  let lines = [];

  const data = f.readFileSync("data/07-data.txt", "utf-8");
  data.split(/\r?\n/).forEach((line) => {
    lines.push(line);
  });

  /**
   * Card strengths when jokers are present
   */
  const strengths = [
    { card: "A", strength: 14 },
    { card: "K", strength: 13 },
    { card: "Q", strength: 12 },
    { card: "T", strength: 10 },
    { card: "9", strength: 9 },
    { card: "8", strength: 8 },
    { card: "7", strength: 7 },
    { card: "6", strength: 6 },
    { card: "5", strength: 5 },
    { card: "4", strength: 4 },
    { card: "3", strength: 3 },
    { card: "2", strength: 2 },
    { card: "J", strength: 1 },
  ];

  const getHandStrengths = (cards) => {
    const splitted = cards.split("").map((card) => {
      return strengths.find((strength) => strength.card === card).strength;
    });
    return splitted;
  };

  const hands = lines.map((line) => {
    const splitted = line.split(/\s+/);
    return {
      cards: splitted[0],
      bid: parseInt(splitted[1]),
      strengths: getHandStrengths(splitted[0]),
      type: getHandType(getHandStrengths(splitted[0]), true),
    };
  });

  const sum = hands
    .sort((a, b) => compareHands(a, b))
    .reduce((a, b, i) => a + b.bid * (i + 1), 0);
  console.log("Part 2", sum);
};

part1();
part2();
