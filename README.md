# Comunica with Solid authentication for GraphQL-LD

[![Build Status](https://travis-ci.org/rubensworks/graphql-ld-comunica-solid.js.svg?branch=master)](https://travis-ci.org/rubensworks/graphql-ld-comunica-solid.js)
[![Coverage Status](https://coveralls.io/repos/github/rubensworks/graphql-ld-comunica-solid.js/badge.svg?branch=master)](https://coveralls.io/github/rubensworks/graphql-ld-comunica-solid.js?branch=master)
[![npm version](https://badge.fury.io/js/graphql-ld-comunica-solid.svg)](https://www.npmjs.com/package/graphql-ld-comunica-solid)

This is a [GraphQL-LD](https://github.com/rubensworks/graphql-ld.js) engine for executing queries
using the [Comunica](https://github.com/comunica/comunica) query engine
with [Solid](https://solid.mit.edu/) authentication.

This tool is identical to [graphql-ld-comunica](https://github.com/rubensworks/GraphQL-LD-Comunica-Solid.js),
with the additional feature that HTTP requests are authenticated using [solid-auth-client](https://github.com/solid/solid-auth-client/).

## Usage

_This requires you to install [graphql-ld-comunica-solid](https://github.com/rubensworks/graphql-ld-comunica-solid.js): `yarn add graphql-ld-comunica-solid`._

```javascript
import {Client} from "graphql-ld";
import {QueryEngineComunicaSolid} from "graphql-ld-comunica-solid";

// Define a JSON-LD context
const context = {
  "@context": {
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "label": "rdfs:label",
    "foaf": "http://xmlns.com/foaf/0.1/",
    "name": "foaf:name",
    "img": "foaf:img",
    "interests": "foaf:topic_interest",
    "RUBEN": { "@id": "https://www.rubensworks.net/#me" }
  }
};

// Create a GraphQL-LD client based on a client-side Comunica engine over 3 sources
const comunicaConfig = {
  sources: [
    "https://www.rubensworks.net/",
    "http://fragments.dbpedia.org/2016-04/en",
  ],
};
const client = new Client({ context, queryEngine: new QueryEngineComunicaSolid(comunicaConfig) });

// Define a query
const query = `
  query @single {
    id(_:RUBEN)
    name @single
    img @single
    interests {
      id @single
      label @single
    }
  }`;

// Execute the query
const { data } = await client.query({ query });
```

## License
This software is written by [Ruben Taelman](http://rubensworks.net/).

This code is released under the [MIT license](http://opensource.org/licenses/MIT).
