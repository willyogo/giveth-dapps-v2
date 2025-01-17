export interface ISignToGetToken {
	address: string;
	chainId?: number;
	pathname?: string;
}

export interface IChainvineSetReferral {
	address: string;
}

export interface IChainvineClickCount {
	referrerId: string;
	walletAddress: string;
}
