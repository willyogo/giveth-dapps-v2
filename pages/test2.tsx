import { useEffect } from 'react';
import { erc20ABI, useAccount, useContractRead, useNetwork } from 'wagmi';
import { getContract } from 'wagmi/actions';
import { formatWeiHelper } from '@/helpers/number';
import { approveERC20tokenTransfer } from '@/lib/stakingPool';
import config from '@/configuration';

const YourApp = () => {
	const { address, isConnected, status } = useAccount();
	const { chain } = useNetwork();
	const chainId = chain?.id;
	// console.log('address', address, isConnected, status, chainId);
	const { data } = useContractRead({
		address: '0xc916Ce4025Cb479d9BA9D798A80094a449667F5D',
		abi: erc20ABI,
		functionName: 'allowance',
	});

	useEffect(() => {
		const contract = getContract({
			address: '0xc916Ce4025Cb479d9BA9D798A80094a449667F5D',
			abi: erc20ABI,
		});
		contract.read
			.allowance([
				'0x8F48094a12c8F99d616AE8F3305D5eC73cBAA6b6',
				'0x632AC305ed88817480d12155A7F1244cC182C298',
			])
			.then(res => console.log('Allow', formatWeiHelper(res.toString())));
	}, []);

	console.log('contractRead', getContract);

	return (
		<div>
			<w3m-button />
			<div>
				<button
					onClick={() => {
						if (!chainId) return;
						approveERC20tokenTransfer(
							1000000000000000000n,
							address!,
							config.NETWORKS_CONFIG[chainId]?.GIVPOWER
								?.LM_ADDRESS!,
							config.NETWORKS_CONFIG[chainId].GIV_TOKEN_ADDRESS!,
							chainId,
						);
					}}
				>
					FUck This Approval stuffs
				</button>
			</div>
		</div>
	);
};

export default YourApp;
