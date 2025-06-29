interface KeysMap {
  [key: string]: string;
}

export const beautifierConfig: Record<number, KeysMap> = {
  35505: {
    w: 'workerId',
    h: 'blockHeight',
    b: 'blockHash',
    x: 'txId',
    m: 'amount',
    s: 'shares',
    t: 'totalShares',
    c: 'createdAt'
  }
  // Add more kinds with their respective maps as needed
};
