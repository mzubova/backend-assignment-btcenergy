interface IBlockchainCacheProvider {
   getBlock(hash: string): Promise<Block | null>;
   setBlock(block: Block): void;
   getBlocksForDay(date: Date): Promise<BlocksInDay | null>;
   setBlocksForDay(date: Date, blocks: BlocksInDay): Promise<void>;
   getConsumptionPerDays(cacheKey: string): Promise<ConsumptionForDay[]>;
   setConsumptionPerDays(cacheKey: string, consumption: ConsumptionForDay[]): Promise<void>;
}

