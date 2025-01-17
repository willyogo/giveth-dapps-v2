import { fetchEnsAddress } from '@wagmi/core';

export function isAddressENS(ens: string | undefined) {
	if (!ens) return false;
	return ens?.toLowerCase().indexOf('.eth') > -1;
}

// Before calling getAddressFromENS, check if user is on Mainnet
export async function getAddressFromENS(ens: string | undefined) {
	return await fetchEnsAddress({ name: ens! });
}
