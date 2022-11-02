interface IEnergyConsumptionService {
    getForBlockPerTransaction(hash: string): Promise<ConsumptionForBlockTx[]>,
    getForDay(lastNumberOfDays: number): Promise<ConsumptionForDay[]>
}

interface ConsumptionForDay {
    date: string;
    consumption: number;
    totalBlocks: number;
}

interface ConsumptionForBlockTx {
    hash: string;
    size: number;
    consumption: number;
}