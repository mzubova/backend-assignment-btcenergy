import { COST_PER_BYTE } from '../config';

export class EnergyRateService implements IEnergyRateService {
    getRate(): number {
        return COST_PER_BYTE;
    }
    getCostPerBytes(bytes: number): number {
        // decimals in js are not 100% accurate => miltiple & divide on 100
        return bytes * (this.getRate() * 100) / 100;
    }
}

export const energyRateService = new EnergyRateService();