const errors = {
  NotQuadraticMatrix: {
    status: 403,
    message: 'It cannot be processed the dna, it is not quadratic matrix.'
  },
  MinimunSequence: {
    status: 403,
    message: 'It cannot be processed the dna, the minimum sequence is 4.'
  }
};

module.exports = errors;
