/// <reference types="jest" />
import { ObservableQuery } from '../../src/core/ObservableQuery';
import { ApolloQueryResult } from '../../src/core/types';
import { Subscription } from '../../src/util/Observable';
export default function subscribeAndCount(done: jest.DoneCallback, observable: ObservableQuery<any>, cb: (handleCount: number, result: ApolloQueryResult<any>) => any): Subscription;
//# sourceMappingURL=subscribeAndCount.d.ts.map