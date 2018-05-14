const assert = require('assert'),
  mongoDb = require('mongo-mock'),
  Mutant = require('../../../api/mutant/model/mutant');

mongoDb.max_delay = 0;
const MongoClient = mongoDb.MongoClient;

MongoClient.persist="mongo.js";
const url = 'mongodb://mlmutant:mlmutant@ds117590.mlab.com:17590/ml-mutant';

let clientDB;
let collectionDB
MongoClient.connect(url, {} , (err, db) => {
  clientDB = db;
  collectionDB = clientDB.collection('mlmutant');

  const mockData = {
    "count_mutant_dna": 0,
    "count_human_dna": 0,
    "ratio": 0
  };
  collectionDB.insertOne(mockData, {} , (err, result) => {});
});


describe('Suite Mutant >', () => {
  after(() => {
    clientDB.close();
  });

  describe('isMutant function', () => {

    it('Should return true', done => {
      const dna = ["ATGCTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
      Mutant.isMutant(collectionDB, dna, (err, isMutant) => {
        assert.equal(isMutant, true);
        setTimeout(done, 100);
      });
    });

    it('Should return false', done => {
      const dna = ["CTGCTA","CAGTGC","TTATGT","AGAAGG","CTCCTA","TCACTG"];
      Mutant.isMutant(collectionDB, dna, (err, isMutant) => {
        assert.equal(isMutant, false);
        setTimeout(done, 100);
      });
    });

  });

  describe('stats function', () => {
    it('should return ratio = 1.00', done => {
      const expected = {
        'count_mutant_dna': 1,
        'count_human_dna': 1,
        'ratio': '1.00'
      };
      Mutant.stats(collectionDB, (err, result) => {
        assert.equal(result.count_mutant_dna,  expected.count_mutant_dna);
        assert.equal(result.count_human_dna,  expected.count_human_dna);
        assert.equal(result.ratio,  expected.ratio);
        setTimeout(done, 100);
      })
    });
  });
});