function generateDobbleDeck(p) {
  const totalSymbols = p * p + p + 1;
  let cards = [];

  for (let i = 0; i <= p; i++) {
    for (let j = 0; j <= p; j++) {
      let card = [(i * j) % (p + 1)];
      for (let k = 1; k <= p; k++) {
        card.push(p + 1 + ((i * k) + j) % p + (k - 1) * p);
      }
      cards.push(card);
    }
  }

  return cards;
}

module.exports = { generateDobbleDeck };