function generateDobbleDeck(n) {
  var N = n;     // number of symbols on each card
  var nC = 0;    // progressive number of cards
  var sTot = []; // array of series (cards)
  
  // check if N is valid (it must be a prime number +1)
  if (!isPrime(N-1)) {
  console.log("ERROR: N value ("+N+") is not a prime number +1:"); 
  }
  
  // Generate series from #01 to #N
  for (i=0; i <= N-1; i++)  {
    var s = [];
    nC++;
    s.push(1);
    for (i2=1; i2 <= N-1; i2++) {
        s.push((N-1) + (N-1) * (i-1) + (i2+1));
    }
    sTot.push(s);
  }
  
  // Generate series from #N+1 to #N+(N-1)*(N-1)
  for (i= 1; i<= N-1; i++) {
    for (i2=1; i2 <= N-1; i2++) {
      var s = [];
      nC++;
      s.push(i+1);
      for (i3=1; i3<= N-1; i3++) {
        s.push((N+1) + (N-1) * (i3-1) + ( ((i-1) * (i3-1) + (i2-1)) ) % (N-1));
      }
      sTot.push(s);
    }
  }
  
  shuffled = shuffle(sTot)
  for (i=0; i <= N-1; i++)  {
    shuffled[i] = shuffle(shuffled[i])
  }
  return shuffled
}

function shuffle(array) {
  let shuffled = array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  return shuffled
}

function isPrime(num) {
  for(var i = 2; i < num; i++) {
    if(num % i === 0) return false;
  }
  return num > 1;
}

module.exports = { generateDobbleDeck };