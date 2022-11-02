
import { redis } from './redisClient';
import { CACHE_FIELDS } from '../enums/cache.enum';
import { CACHE_TTL_IN_SECONDS_BLOCK, CACHE_TTL_IN_SECONDS_BLOCK_DAY } from '../config';

class BlockchainCaheProvider implements IBlockchainCacheProvider {
    async getBlock(hash: string) {
        return this.#hgetCache(hash, CACHE_FIELDS.Block)
    }

    async setBlock(block: Block): Promise<void> {
        return this.#hsetCache(block.hash, CACHE_FIELDS.Block, block, CACHE_TTL_IN_SECONDS_BLOCK)
    }

    async getBlocksForDay(date: Date): Promise<BlocksInDay | null> {
        return this.#hgetCache(date.toLocaleDateString(), CACHE_FIELDS.BlocksForOneDay)
    }

    async setBlocksForDay(date: Date, blocks: BlocksInDay) {
        return this.#hsetCache(date.toLocaleDateString(), CACHE_FIELDS.BlocksForOneDay, blocks, CACHE_TTL_IN_SECONDS_BLOCK_DAY)
    }

    async getConsumptionPerDays(cacheKey: string): Promise<ConsumptionForDay[]> {
        return this.#hgetCache(cacheKey, CACHE_FIELDS.ConsumptionForDay)
    }

    async setConsumptionPerDays(cacheKey: string, consumption: ConsumptionForDay[]): Promise<void> {
        return this.#hsetCache(cacheKey, CACHE_FIELDS.ConsumptionForDay, consumption, CACHE_TTL_IN_SECONDS_BLOCK)
    }

    async #hgetCache(key: string, field: string) {
        try {
            const data = await redis.hget(key, field);
            if (!data) {
                return null;
            }
            return JSON.parse(`${data}`);
        } catch (err) {
            console.error(`HGET Redis error ${err}, key ${key}, field ${field}`);
            // don't throw err as lambda should still be able to fetch and return data
            // if something's wrong with caching 
        }
    }

    async #hsetCache(key: string, field: string, data: any, ttl?: number) {
        try {
            if (!data) {
                return;
            }
            await redis.hset(key, field, JSON.stringify(data));
            // if no TTL, shall we use default?
            if (ttl) {
                redis.expire(key, ttl)
            }
        } catch (err) {
            console.error(`HSET Redis error ${err}, key ${key}, field ${field}`);
            // don't throw
        }
    }
}

export const blockchainCacheProvider = new BlockchainCaheProvider();