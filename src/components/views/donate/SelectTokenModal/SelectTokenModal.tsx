import styled from 'styled-components';
import {
	Caption,
	IconGIVBack,
	SublineBold,
	brandColors,
	mediaQueries,
	neutralColors,
} from '@giveth/ui-design-system';
import {
	useState,
	type Dispatch,
	type FC,
	type SetStateAction,
	useEffect,
} from 'react';
import { useAccount } from 'wagmi';
import { IModal } from '@/types/common';
import { Modal } from '@/components/modals/Modal';
import { useModalAnimation } from '@/hooks/useModalAnimation';
import { Flex } from '@/components/styled-components/Flex';
import config from '@/configuration';
import { TokenInfo } from './TokenInfo';
import { fetchBalance } from '@/services/token';
import { IToken } from '@/types/superFluid';
import { StreamInfo } from './StreamInfo';
import type {
	ISelectTokenWithBalance,
	ITokenStreams,
} from '../RecurringDonationCard';

export interface ISelectTokenModalProps extends IModal {
	tokenStreams: ITokenStreams;
	setSelectedToken: Dispatch<
		SetStateAction<ISelectTokenWithBalance | undefined>
	>;
}

export const SelectTokenModal: FC<ISelectTokenModalProps> = ({
	tokenStreams,
	setShowModal,
	setSelectedToken,
}) => {
	const { isAnimating, closeModal } = useModalAnimation(setShowModal);

	return (
		<Modal
			closeModal={closeModal}
			isAnimating={isAnimating}
			headerTitle='Select a Token'
			headerTitlePosition='left'
		>
			<SelectTokenInnerModal
				tokenStreams={tokenStreams}
				setShowModal={setShowModal}
				setSelectedToken={setSelectedToken}
			/>
		</Modal>
	);
};

export interface IBalances {
	[key: string]: bigint;
}

const allTokens = config.OPTIMISM_CONFIG.SUPER_FLUID_TOKENS;

const SelectTokenInnerModal: FC<ISelectTokenModalProps> = ({
	tokenStreams,
	setShowModal,
	setSelectedToken,
}) => {
	const [balances, setBalances] = useState<IBalances>({});
	const { address } = useAccount();

	useEffect(() => {
		// Ensure we have an address before proceeding
		if (!address) {
			console.log('No address found.');
			return;
		}

		// A helper function to fetch balance for a single token
		const fetchTokenBalance = async (token: IToken) => {
			try {
				const balance = await fetchBalance(token.id, address);
				return { symbol: token.symbol, balance };
			} catch (error) {
				console.error(
					`Error fetching balance for ${token.symbol}:`,
					error,
				);
				return { symbol: token.symbol, balance: undefined };
			}
		};

		// Initiate all balance fetches concurrently
		const fetchAllBalances = async () => {
			const _allTokens = allTokens.reduce((acc, token) => {
				acc.push(token);
				acc.push(token.underlyingToken);
				return acc;
			}, [] as IToken[]);

			// Create an array of promises for each token balance fetch
			const balancePromises = _allTokens.map(token =>
				fetchTokenBalance(token),
			);

			// Wait for all promises to settle
			const results = await Promise.all(balancePromises);

			// Process results into a new balances object
			const newBalances = results.reduce((acc, { symbol, balance }) => {
				if (balance !== undefined) {
					acc[symbol] = balance;
				}
				return acc;
			}, {} as IBalances);

			console.log('newBalances', newBalances);

			// Update the state with the new balances
			setBalances(newBalances);
		};

		// Call the function to fetch all balances
		fetchAllBalances();
	}, [address]); // Dependency array includes address to refetch if it changes

	return (
		<>
			<Wrapper>
				<Title medium>Stream Balances</Title>
				{Object.keys(tokenStreams).map(tokenId => {
					const token = allTokens.find(
						token => token.id === tokenId,
					) as IToken;
					return (
						<StreamInfo
							key={tokenId}
							stream={tokenStreams[tokenId]}
							balance={balances[token.symbol]}
							disable={
								!balances[token.symbol] ||
								balances[token.symbol] === 0n
							}
							onClick={() => {
								setSelectedToken({
									token,
									balance: balances[token.symbol],
								});
								setShowModal(false);
							}}
						/>
					);
				})}
				{/* {allTokens.map(token =>
				tokenStreams[token.id] ? null : (
					<TokenInfo
						key={token.symbol}
						token={token}
						balance={balances[token.symbol]}
						disable={
							!balances[token.symbol] ||
							balances[token.symbol] === 0n
						}
						isSuperToken={true}
						onClick={() => {
							setSelectedToken({
								token,
								balance: balances[token.symbol],
							});
							setShowModal(false);
						}}
					/>
				),
			)} */}
				<Title medium>Eligible Tokens</Title>
				{allTokens.map(token => (
					<TokenInfo
						key={token.underlyingToken.symbol}
						token={token.underlyingToken}
						balance={balances[token.underlyingToken.symbol]}
						disable={balances[token.underlyingToken.symbol] === 0n}
						onClick={() => {
							setSelectedToken({
								token: token.underlyingToken,
								balance: balances[token.underlyingToken.symbol],
							});
							setShowModal(false);
						}}
					/>
				))}
			</Wrapper>
			<GIVbackWrapper>
				<Flex gap='8px' alignItems='center'>
					<IconGIVBack size={24} color={brandColors.giv[500]} />
					<SublineBold>GIVbacks eligible tokens</SublineBold>
				</Flex>
			</GIVbackWrapper>
		</>
	);
};

const Wrapper = styled(Flex)`
	flex-direction: column;
	padding: 12px 24px;
	gap: 12px;
	${mediaQueries.tablet} {
		width: 548px;
	}
`;

const Title = styled(Caption)`
	text-align: left;
	padding-bottom: 4px;
	border-bottom: 1px solid ${neutralColors.gray[300]};
	color: ${neutralColors.gray[700]};
`;

const GIVbackWrapper = styled.div`
	padding: 12px 24px;
	background: ${neutralColors.gray[200]};
`;