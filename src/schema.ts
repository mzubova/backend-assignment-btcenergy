import { SchemaComposer } from 'graphql-compose'
import { energyConsumptionService } from './services/energyConsumption.service'

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
  hello: {
    type: () => 'String!',
    resolve: () => 'Hi there, good luck with the assignment!!',
  },
  getConsumptionForBlockTxs: {
    type: () => 'JSON',
    args: { hash: 'String!' },
    resolve: async (_, { hash }) => await energyConsumptionService.getForBlockPerTransaction(hash)
  },
  getForDays: {
    type: () => '[JSON]',
    args: { lastNumberOfDays: 'Int!' },
    resolve: async (_, { lastNumberOfDays }) => {
      if (lastNumberOfDays > 3) {
        throw new Error(`Too many days specified. Max value allowed: 3`);
      }
      const result = await energyConsumptionService.getForDay(lastNumberOfDays)
      return result;
    },
  },
})

export const schema = schemaComposer.buildSchema()
