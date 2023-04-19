function parseText(text) {
    return text.toLowerCase().replace(/[^a-z\s]/g, "").split(' ');
}

function generateWordpairs(corpus){
    let wordpairs = {};

    let words = parseText(corpus);

    for(let a = 0; a < words.length - 1; a++){
      let currentWord = words[a];
      let nextWord = words[a+1];

      if(wordpairs[currentWord]){
        wordpairs[currentWord].push(nextWord);
      }
      else{
        wordpairs[currentWord] = [nextWord];
      }
    }

    return wordpairs;
}

function randomlyChoose(wordArray){
  let index = Math.floor(wordArray.length * Math.random());
  return wordArray[index];
}

function writeLine(markov, min_length){
    let words = Object.keys(markov);
    let word = randomlyChoose(words);
    let phrase = [word]; 

    while(markov[word]){
        let next_words = markov[word];
        word = randomlyChoose(next_words);
        phrase.push(word);

        if(phrase.length > min_length){
            break;
        }
    }

    return phrase.join(' ');
}

function generatePoem(corpus, lines){
    markov = generateWordpairs(corpus)
    for(let i = 0; i < lines; i++){
        let l = Math.floor(Math.random() * 10) + 1;
        console.log(writeLine(markov, l))
    }
}