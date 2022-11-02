interface IEnergyRateService {
    getRate(): number;
    getCostPerBytes(bytes: number): number;
}