'use stricts';

const Mutant = require('../model/mutant'),
  exception = require('../exception/exception');

const SEQUENCE_NUMBER =  4;

exports.isMutant = (req, res) => {
  countMutantSequence = 0;
  const dna = req.body.dna;
  const isNotQuadraticMatrix = dna.find(sequence => sequence.length !== dna.length);

  if (isNotQuadraticMatrix) {
    res.status(exception['NotQuadraticMatrix'].status).json({ result: exception['NotQuadraticMatrix'].message });
    return;
  }

  if (dna.length < SEQUENCE_NUMBER) {
    res.status(exception['MinimunSequence'].status).json({ result: exception['MinimunSequence'].message });
    return;
  }

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
    if (err) res.status(403).json('Error');

    res.status(200).json({
        "count_mutant_dna": result.count_mutant_dna,
        "count_human_dna": result.count_human_dna,
        "ratio": result.ratio
    });
  });
};
