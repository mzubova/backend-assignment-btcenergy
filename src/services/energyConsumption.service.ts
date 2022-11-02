
import { blockchainDataProvider } from '../data-provider/blockchainDataProvider'
import { energyRateService } from './energyRate.service';
import { getDateFormatted } from '../utils/dateHelper';

class EnergyConsumptionService implements IEnergyConsumptionService {
    async getForBlockPerTransaction(hash: string) {
        const block = await blockchainDataProvider.getBlock(hash);
        return block.tx.map((t) => {
            return {
                hash: t.hash,
                size: t.size,
                consumption: energyRateService.getCostPerBytes(t.size)
            }
        })
    }

    async getForDay(lastNumberOfDays: number): Promise<ConsumptionForDay[]> {
        // check cache first
        const consumption = await blockchainDataProvider.getConsumptionPerDays(lastNumberOfDays);
        if (consumption) {
            return consumption;
        }

        // get block summary for specified days
        const blocksInDays = await blockchainDataProvider.getBlocksPerDays(lastNumberOfDays);

        // get full block info for every block summary in a day (concurrently)
        const blocksForDaysInfoPromises = blocksInDays.map(async (day) => {
            return {
                date: day.date,
                blocks: await this.#getBlockInfo(day.blocks)
            }
        })
        const blocksForDaysInfo = await Promise.all(blocksForDaysInfoPromises);

        const result = blocksForDaysInfo?.map(r => {
            return {
                date: getDateFormatted(r.date),
                consumption: this.#calculateTotalBlockConsumption(r.blocks),
                totalBlocks: r.blocks?.length,
            }
        }) as ConsumptionForDay[];
        blockchainDataProvider.saveConsumptionPerDays(lastNumberOfDays, result);
        return result;
    }

    #getBlockInfo = async (blocks: BlockSummary[]): Promise<Block[]> => {
        const promises = blocks.map(async (block) => {
            return blockchainDataProvider.getBlock(block.hash)
        })
        const result = await Promise.all(promises);
        return result;
    }

    #calculateTotalBlockConsumption = (blocks: Block[]) => {
        const totalSize = blocks?.reduce((acc, val) => {
            return acc + val.size
        }, 0)
        const cost = energyRateService.getCostPerBytes(totalSize);
        return cost;
    }
}

export const energyConsumptionService = new EnergyConsumptionService();

