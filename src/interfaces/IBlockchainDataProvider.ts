interface IBlockchainDataProvider {
  getBlock(hash: string): Promise<Block>;
  getBlocksPerDays(lastNumberOfDays: number): Promise<BlocksInDay[]>;
  getConsumptionPerDays(lastNumberOfDays: number): Promise<ConsumptionForDay[]>;
  saveConsumptionPerDays(lastNumberOfDays: number, consumptions: ConsumptionForDay[]): Promise<void>;
}

interface BlocksInDay {
  date: Date;
  blocks: BlockSummary[];
}
