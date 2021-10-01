import {ActorInitSparql} from "@comunica/actor-init-sparql/lib/ActorInitSparql-browser";
import {newEngine} from "@comunica/actor-init-sparql-solid";
import {IQueryEngine} from "graphql-ld";
import {Algebra} from "sparqlalgebrajs";
import * as stringifyStream from "stream-to-string";

/**
 * A GraphQL-LD engine that is backed by Comunica.
 */
export class QueryEngineComunicaSolid implements IQueryEngine {

  private readonly comunicaEngine: ActorInitSparql;
  private readonly context: any;

  constructor(context: any) {
    this.comunicaEngine = newEngine();
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
