export declare class CacheKeyNode<KeyType = object> {
    private children;
    private key;
    lookup(...args: any[]): KeyType;
    lookupArray(array: any[]): KeyType;
    getOrCreate(value: any): CacheKeyNode<KeyType>;
}
//# sourceMappingURL=cacheKeys.d.ts.map