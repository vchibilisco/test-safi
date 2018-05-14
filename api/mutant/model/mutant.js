const MINIMUM_SEQUENCE_REQUIRED = 2;
const MUTANT_DNA_SEQUENCES = ['AAAA', 'TTTT', 'CCCC', 'GGGG'];

let countMutantSequence = 0;

module.exports = {
  isMutant: (dbCollection, dna, callback) => {
    countMutantSequence = 0;
    horizontal(dna);
    vertical(dna);
    oblique(dna);

    dbCollection.findOne({}, {}, (err, result) => {
      if (err) return console.log(err);

      const stats = Object.assign({}, result);
      const isMutant = countMutantSequence >= MINIMUM_SEQUENCE_REQUIRED;

      stats.count_mutant_dna = isMutant ? stats.count_mutant_dna + 1 : stats.count_mutant_dna;
      stats.count_human_dna = isMutant ? stats.count_human_dna : stats.count_human_dna + 1;
      stats.ratio = (stats.count_mutant_dna / stats.count_human_dna).toFixed(2);

      dbCollection.updateOne({ '_id': stats._id }, { $set: { ...stats } }, { upsert: true }, (err, result) => {
        callback(err, countMutantSequence >= MINIMUM_SEQUENCE_REQUIRED);
      });
    });
  },
  stats: (dbCollection, callback) => {
    dbCollection.findOne({}, {}, (err, result) => {
      callback(err, result);
    });
  }
};

const horizontal = dna => {
  dna.forEach(sequence => analizySequence(sequence));
};

const vertical = dna => {
  for (let i = 0; i < dna.length; i++) {
    let word= '';
    dna.forEach(sequence => {
      word = word.concat(sequence.charAt(i));
    });
    analizySequence(word);
  }
};

const oblique = dna => {
  let word= '';
  for (let i = 0; i < dna.length; i++) {
    dna.forEach((sequence, index) => {
      if (i === index)
        word = word.concat(sequence.charAt(i));
    });
  }
  analizySequence(word);
};

const analizySequence = sequence => {
  if (MUTANT_DNA_SEQUENCES.find(mds => sequence.indexOf(mds) != -1)) {
    countMutantSequence += 1;
  }
};
