'use stricts';

const Mutant = require('../model/mutant');
const SEQUENCE_NUMBER =  4;

exports.isMutant = (req, res) => {
  countMutantSequence = 0;
  const dna = req.body.dna;
  const isNotQuadraticMatrix = dna.find(sequence => sequence.length !== dna.length);
  
  if (isNotQuadraticMatrix)
    res.status(403).json('It cannot be processed the dna');

  if (dna.length < SEQUENCE_NUMBER)
    res.status(403).json('It cannot be processed the dna');

  const dnaUpperCase = dna.map(sequence => sequence.toUpperCase());  

  Mutant.isMutant(req.app.dbCollection, dnaUpperCase, (err, isMutant) => {
    if (isMutant)
      res.status(200).json({ result: 'Is mutant' });
    else
      res.status(403).json({ result: 'Is human' });
  });
};

exports.stats = (req, res) => {
  Mutant.stats(req.app.dbCollection, (err, result) => {
    if (err) res.stats(403).send('Error');

    res.status(200).json({
        "count_mutant_dna": result.count_mutant_dna,
        "count_human_dna": result.count_human_dna,
        "ratio": result.ratio
    });
  });
};
