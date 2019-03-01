import { ApolloLink, Operation, NextLink, FetchResult, Observable } from 'apollo-link';
export declare class DedupLink extends ApolloLink {
    private inFlightRequestObservables;
    private subscribers;
    request(operation: Operation, forward: NextLink): Observable<FetchResult>;
}
