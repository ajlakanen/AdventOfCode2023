const f = require("fs");

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

const getHandType = (strengths) => {
  const sorted = strengths.sort((a, b) => b - a);

  // Five of a kind (7)
  const fiveOfAKind = sorted.every((strength) => strength === sorted[0]);
  if (fiveOfAKind) return 7;

  // Four of a kind
  const fourOfAKind = sorted.some((strength) => {
    const filtered = sorted.filter((s) => s === strength);
    return filtered.length === 4;
  });
  if (fourOfAKind) return 6;

  // Full house
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
  if (fullHouse) return 5;

  // Three of a kind
  const threeOfAKind = sorted.some((strength) => {
    const filtered = sorted.filter((s) => s === strength);
    return filtered.length === 3;
  });
  if (threeOfAKind) return 4;

  // Two pair
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
  if (twoPairs) return 3;

  // One pair
  const onePair = sorted.some((strength) => {
    const filtered = sorted.filter((s) => s === strength);
    return filtered.length === 2;
  });
  if (onePair) return 2;

  // High card
  return 1;
};

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

  const hands = lines.map((line) => {
    const splitted = line.split(/\s+/);
    return {
      cards: splitted[0],
      bid: parseInt(splitted[1]),
      strengths: getHandStrengths(splitted[0]),
      type: getHandType(getHandStrengths(splitted[0])),
    };
  });

  const bids = hands.sort((a, b) => compareHands(a, b));
  // console.log("sorted", bids, "length", bids.length);
  // const winnings = bids.reduce((a, b, i) => {
  //   return a.bid + b.bid * (bids.length - i);
  // });

  const sum = bids.reduce((a, b, i) => a + b.bid * (i + 1), 0);
  console.log("Part 1", sum);
};

part1();
