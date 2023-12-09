const f = require("fs");

/**
 * Get the type of a hand based on the strengths of the cards in the hand.
 * This is the core of the solution.
 * @param {Array} cardRanks   Ranks of the cards in the hand
 * @param {Boolean} jokers    Are jokers present when calculating the hand type.
 *                            If true, jokers ('J') are treated as wildcards,
 *                            otherwise they are treated as Jacks.
 * @returns {number}          Hand type
 */
const getHandType = (cardRanks, jokers = false) => {
  cardRanks = jokers ? cardRanks.filter((s) => s !== 1) : cardRanks;
  const jokersAmount = jokers ? 5 - cardRanks.length : 0;
  const sorted = cardRanks.sort((a, b) => b - a);

  // Five of a kind (7 points)
  const fiveOfAKind = sorted.filter((rank) => rank === sorted[0]).length === 5;
  if (fiveOfAKind) return 7;

  // Four of a kind (6 points)
  const fourOfAKind = sorted.some((rank) => {
    return sorted.filter((s) => s === rank).length === 4;
  });
  // 4 of a kind with 1 joker is 7 points
  if (fourOfAKind && jokersAmount >= 1) return 7;
  if (fourOfAKind) return 6;

  // Full house (5 points)
  const fullHouse = sorted.some((rank) => {
    const filtered = sorted.filter((s) => s === rank);
    return (
      filtered.length === 3 &&
      sorted.some((rank) => {
        return sorted.filter((s) => s === rank).length === 2;
      })
    );
  });
  // Full house (5 cards) can't have any jokers
  if (fullHouse) return 5;

  // Three of a kind (4 points)
  const threeOfAKind = sorted.some((rank) => {
    const filtered = sorted.filter((s) => s === rank);
    return filtered.length === 3;
  });
  // Three of a kind with 2 jokers can only be five of a kind (7 points).
  // Similarly, 3 of a kind with 1 joker can only be four of a kind (6 points).
  if (threeOfAKind && jokersAmount === 2) return 7;
  if (threeOfAKind && jokersAmount === 1) return 6;
  if (threeOfAKind) return 4;

  // Two pair (3 points)
  const twoPairs = sorted.some((rank) => {
    const firstPair = sorted.filter((s) => s === rank);
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
  const onePair = sorted.some((rank) => {
    return sorted.filter((s) => s === rank).length === 2;
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
  for (let i = 0; i < hand1.ranks.length; i++) {
    if (hand1.ranks[i] < hand2.ranks[i]) return -1;
    if (hand1.ranks[i] > hand2.ranks[i]) return 1;
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
   * Card ranks when jokers are not present
   */
  const ranks = [
    { card: "A", rank: 14 },
    { card: "K", rank: 13 },
    { card: "Q", rank: 12 },
    { card: "J", rank: 11 },
    { card: "T", rank: 10 },
    { card: "9", rank: 9 },
    { card: "8", rank: 8 },
    { card: "7", rank: 7 },
    { card: "6", rank: 6 },
    { card: "5", rank: 5 },
    { card: "4", rank: 4 },
    { card: "3", rank: 3 },
    { card: "2", rank: 2 },
  ];

  const getRanks = (cards) => {
    return cards.split("").map((card) => {
      return ranks.find((rank) => rank.card === card).rank;
    });
  };

  const hands = lines.map((line) => {
    const splitted = line.split(/\s+/);
    return {
      cards: splitted[0],
      bid: parseInt(splitted[1]),
      ranks: getRanks(splitted[0]),
      type: getHandType(getRanks(splitted[0])),
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
   * Card ranks when jokers are present
   */
  const ranks = [
    { card: "A", rank: 14 },
    { card: "K", rank: 13 },
    { card: "Q", rank: 12 },
    { card: "T", rank: 10 },
    { card: "9", rank: 9 },
    { card: "8", rank: 8 },
    { card: "7", rank: 7 },
    { card: "6", rank: 6 },
    { card: "5", rank: 5 },
    { card: "4", rank: 4 },
    { card: "3", rank: 3 },
    { card: "2", rank: 2 },
    { card: "J", rank: 1 },
  ];

  const getRanks = (cards) => {
    return cards.split("").map((card) => {
      return ranks.find((rank) => rank.card === card).rank;
    });
  };

  const hands = lines.map((line) => {
    const splitted = line.split(/\s+/);
    return {
      cards: splitted[0],
      bid: parseInt(splitted[1]),
      ranks: getRanks(splitted[0]),
      type: getHandType(getRanks(splitted[0]), true),
    };
  });

  const sum = hands
    .sort((a, b) => compareHands(a, b))
    .reduce((a, b, i) => a + b.bid * (i + 1), 0);
  console.log("Part 2", sum);
};

part1();
part2();
