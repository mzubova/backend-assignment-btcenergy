import { energyConsumptionService } from '../src/services/energyConsumption.service';
import { blockchainCacheProvider } from '../src/data-provider/blockchainCacheProvider';

// mock getting/setting cache data
blockchainCacheProvider.getBlock = jest.fn();
blockchainCacheProvider.setBlock = jest.fn();

test('Gets consumption for all transactions in block', async () => {
  const hash = '00000000000000000004656d346fbac96ddcec6ee31b6abd696a241cd6994181';
  const result = await energyConsumptionService.getForBlockPerTransaction(hash)
  expect(result[0]).toHaveProperty('hash');
  expect(result[0]).toHaveProperty('size', 341);
  expect(result[0]).toHaveProperty('consumption', 1554.9599999999998);
});