const comunicaEngine = {
  query: jest.fn((query, context) => Promise.resolve(`{ "a": "b" }`)),
  resultToString: jest.fn((data) => Promise.resolve({ data: streamifyString(data) })),
};
jest.mock('../lib/comunica-engine', () => comunicaEngine);

import {IQueryEngine} from "graphql-ld";
import {Algebra} from "sparqlalgebrajs";
import translate from "sparqlalgebrajs/lib/sparqlAlgebra";
import {QueryEngineComunicaSolid} from "../lib/QueryEngineComunicaSolid";

const streamifyString = require('streamify-string');

// tslint:disable:object-literal-key-quotes

describe('QueryEngineComunicaSolid', () => {
  let queryEngine: IQueryEngine;
  let sparqlAlgebra: Algebra.Operation;

  beforeEach(async () => {
    queryEngine = new QueryEngineComunicaSolid({ sources: { type: 'rdfjsSource', value: null } });
    sparqlAlgebra = translate('SELECT * WHERE { ?x ?y ?z }');
  });

  describe('query', () => {
    it('should return a JSON object', async () => {
      expect(await queryEngine.query(sparqlAlgebra)).toEqual({ a: 'b' });
      expect(comunicaEngine.query)
        .toHaveBeenCalledWith(sparqlAlgebra, { sources: { type: 'rdfjsSource', value: null } });
      expect(comunicaEngine.resultToString)
        .toHaveBeenCalledWith(`{ "a": "b" }`, 'application/sparql-results+json');
    });
  });
});
