import CacheDataInterface from "../Interfaces/CacheDataInterface";

export class CacheManager {
    private cache: Map<string, CacheDataInterface>;
    constructor() { this.cache = new Map(); setInterval(() => { this.cacheClean.bind(this) }, 60000)};

    public _get(key: string) {
        const findData = this.cache.get(key);
        if(!findData) return undefined;
        if(findData.expiresAt < Date.now()) { this._remove(key); return undefined; };
        return findData.value;
    };

    public _remove(key: string) {
        const findData = this.cache.get(key);
        if(!findData) return;
        this.cache.delete(key);
    };

    public _set(key: string, value: any, ttl: number) {
        const findData = this.cache.get(key);
        if(findData) return 'already_in_cache';
        this.cache.set(key, {value: value, expiresAt: Date.now() + ttl * 1000});
    };

    public _clearAll() {
        return this.cache.clear();
    };

    private cacheClean(): void {
        for(const [key, cacheData] of this.cache.entries()) {
            if(cacheData.expiresAt < Date.now()) {
                this.cache.delete(key);
            };
        };
    };
};