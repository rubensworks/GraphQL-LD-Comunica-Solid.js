import {QueryEngine} from "@comunica/query-sparql-solid";
import {IQueryEngine} from "graphql-ld";
import {Algebra} from "sparqlalgebrajs";
import * as stringifyStream from "stream-to-string";

/**
 * A GraphQL-LD engine that is backed by Comunica.
 */
export class QueryEngineComunicaSolid implements IQueryEngine {

  private readonly comunicaEngine: QueryEngine;
  private readonly context: any;

  constructor(context: any) {
    this.comunicaEngine = new QueryEngine();
    this.context = context;
  }

  public async query(query: Algebra.Operation, options: any = {}): Promise<any> {
    const context: any = { ...options, ...this.context };
    if (context.session) {
      context['@comunica/actor-http-inrupt-solid-client-authn:session'] = context.session;
    }
    const { data } = await this.comunicaEngine.resultToString(
      await this.comunicaEngine.query(query, context),
      'application/sparql-results+json',
    );
    return JSON.parse(await stringifyStream(data));
  }

}
