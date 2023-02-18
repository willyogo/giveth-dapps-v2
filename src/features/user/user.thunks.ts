import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contract } from '@ethersproject/contracts';
import { backendGQLRequest } from '@/helpers/requests';
import { postRequest } from '@/helpers/requests';
import { GET_USER_BY_ADDRESS } from './user.queries';
import { ISignToGetToken } from './user.types';
import { createSiweMessage } from '@/lib/helpers';
import { RootState } from '../store';
import config from '@/configuration';
import StorageLabel from '@/lib/localStorage';
import { getTokens } from '@/helpers/user';
import { walletsArray } from '@/lib/wallet/walletTypes';
import GNOSIS_SAFE_CONTRACT_ABI from '@/lib/abis/gnosis-safe-contract.json';

export const fetchUserByAddress = createAsyncThunk(
	'user/fetchUser',
	async (address: string) => {
		return backendGQLRequest(GET_USER_BY_ADDRESS, { address });
	},
);

export const signToGetToken = createAsyncThunk(
	'user/signToGetToken',
	async (
		{
			address,
			chainId,
			signer,
			pathname,
			library,
			activate,
		}: ISignToGetToken,
		{ getState, dispatch },
	) => {
		try {
			const siweMessage: any = await createSiweMessage(
				address!,
				chainId!,
				pathname!,
				'Login into Giveth services',
			);
			const { nonce, message } = siweMessage;
			const signature = await signer.signMessage(message);

			// try to connect to safe, and starts waiting on the safe to sign
			const safeWallet = walletsArray.find(w => w.name === 'GnosisSafe');
			if (!!safeWallet?.connector?.supportedChainIds) {
				try {
					// makes signature as a multisig
					await activate(safeWallet.connector, console.log).then(
						async () => {
							const gnosisSafeContract = new Contract(
								address,
								GNOSIS_SAFE_CONTRACT_ABI,
								library,
							);
							// create listener that will listen for the SignMsg event on the Gnosis contract
							const listenToGnosisSafeContract = new Promise(
								resolve => {
									gnosisSafeContract.on(
										'SignMsg',
										async msgHash => {
											// Upon detecting the SignMsg event, validate that the contract signed the message

											// TODO: let's validate the signature is the right one
											// const GNOSIS_VALID_SIGNATURE_MAGIC_VALUE = '0x1626ba7e';
											// const magicValue =
											// 	await gnosisSafeContract.isValidSignature(
											// 		keccak256(toUtf8Bytes(message)),
											// 		'0x',
											// 	);
											// const messageWasSigned =
											// 	magicValue ===
											// 	GNOSIS_VALID_SIGNATURE_MAGIC_VALUE;
											const messageWasSigned = true;
											console.log({
												messageWasSigned,
											});
											resolve(msgHash);
										},
									);
								},
							);
							// start listening
							await listenToGnosisSafeContract;
						},
					);
				} catch (error) {
					console.log('not a gnosis safe env');
				}
			}

			if (signature) {
				const state = getState() as RootState;
				if (!state.user.userData) {
					await dispatch(fetchUserByAddress(address));
				}
				const token = await postRequest(
					`${config.MICROSERVICES.authentication}/authentication`,
					true,
					{
						signature,
						message,
						nonce,
					},
				);
				const _address = address.toLowerCase();
				localStorage.setItem(StorageLabel.USER, _address);
				localStorage.setItem(StorageLabel.TOKEN, token.jwt);
				const tokens = getTokens();
				tokens[_address] = token.jwt;
				localStorage.setItem(
					StorageLabel.TOKENS,
					JSON.stringify(tokens),
				);
				// When token is fetched, user should be fetched again to get email address
				await dispatch(fetchUserByAddress(address));
				return token.jwt;
			} else {
				return Promise.reject('Signing failed');
			}
		} catch (error) {
			console.log({ error });
			return Promise.reject('Signing failed');
		}
	},
);

export const signOut = createAsyncThunk(
	'user/signOut',
	async (token?: string | null) => {
		// this is in the case we fail to grab the token from local storage
		//  but still want to remove the whole user
		if (!token) return Promise.resolve(true);
		console.log(Date.now(), 'signOut in user thunk');

		return await postRequest(
			`${config.MICROSERVICES.authentication}/logout`,
			true,
			{
				jwt: token,
			},
		);
	},
);
