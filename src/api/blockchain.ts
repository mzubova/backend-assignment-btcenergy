import axios from 'axios';

export const getBlockInfo = async (hash: string): Promise<Block> => {
    try {
        const { data } = await axios.get(
            `https://blockchain.info/rawblock/${hash}`,
        );
        return data;
    } catch (err) {
        console.error('An error occurred while retrieving block data', err);
        throw err;
    }
}

export const getBlocksForOneDay = async (date: Date): Promise<BlockSummary[]> => {
    try {
        const { data } = await axios.get(`https://blockchain.info/blocks/${date.getTime()}?format=json`);
        return data;
    } catch (err) {
        console.error('An error occurred while retrieving block for one day data', err);
        throw err;
    }
}