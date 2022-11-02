import { getBlockInfo, getBlocksForOneDay } from '../api/blockchain';
import { blockchainCacheProvider } from './blockchainCacheProvider';
import { getDateFormatted, getDatesForLastNumberOfDays } from '../utils/dateHelper';

class BlockchainDataProvider implements IBlockchainDataProvider {
   async getBlock(hash: string): Promise<Block> {
      try {
         const cache = await blockchainCacheProvider.getBlock(hash);
         if (cache) {
            return cache;
         }
         const block = await getBlockInfo(hash);
         blockchainCacheProvider.setBlock(block);
         return block;
      } catch (err) {
         console.error(`An error occurred while getting info for block ${hash}`, err);
         throw err;
      }
   }

   async getBlocksPerDays(lastNumberOfDays: number): Promise<BlocksInDay[]> {
      try {
         const dates = getDatesForLastNumberOfDays(lastNumberOfDays);
         // retrieve all blocks for specified dates concurrently
         const requests = dates.map(async (date) => {
            return this.#getBlocksForOneDay(date)
         });
         const result = await Promise.all(requests);
         return result;
      } catch (err) {
         console.error(`An error occurred while getting blocks per ${lastNumberOfDays} days info`, err);
         throw err;
      }
   }

   async getConsumptionPerDays(lastNumberOfDays: number): Promise<ConsumptionForDay[]> {
      const cacheKey = `${getDateFormatted()}-${lastNumberOfDays}`;
      const cache = await blockchainCacheProvider.getConsumptionPerDays(cacheKey);
      return cache;
   }

   async saveConsumptionPerDays(lastNumberOfDays: number, consumptions: ConsumptionForDay[]) {
      const cacheKey = `${getDateFormatted()}-${lastNumberOfDays}`;
      return blockchainCacheProvider.setConsumptionPerDays(cacheKey, consumptions);
   }

   #getBlocksForOneDay = async (date: Date): Promise<BlocksInDay> => {
      const cache = await blockchainCacheProvider.getBlocksForDay(date);
      if (cache) {
         return cache;
      }
      const blocks = await getBlocksForOneDay(date);
      const blockForDay = {
         date,
         blocks
      }
      blockchainCacheProvider.setBlocksForDay(date, blockForDay)
      return blockForDay;
   }
}

export const blockchainDataProvider = new BlockchainDataProvider();