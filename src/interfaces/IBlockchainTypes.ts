interface Block {
    hash: string;
    size: number;
    time: number;
    tx: BlockTransaction[];
    // other fields from api, for now not needed
}

interface BlockTransaction {
    hash: string;
    size: number;
}

interface BlockSummary {
    hash: string;
    height: number;
    time: number;
    block_index: number;
}

