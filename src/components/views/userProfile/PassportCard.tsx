import React from 'react';
import styled from 'styled-components';
import { B, H3, P, neutralColors } from '@giveth/ui-design-system';
import { ContributeCardBox } from '@/components/ContributeCard.sc';
import { EPassportState, usePassport } from '@/hooks/usePassport';
import { Flex } from '@/components/styled-components/Flex';
import { PassportButton } from '@/components/PassportButton';

export const PassportCard = () => {
	const { info, handleSign, refreshScore } = usePassport();
	const { passportState, passportScore } = info;
	return (
		<StyledContributeCardBox>
			{passportState === EPassportState.NOT_SIGNED ||
			passportState === EPassportState.LOADING ? (
				<B>Gitcoin Passport</B>
			) : (
				<Flex alignItems='center' justifyContent='space-between'>
					<B>Your Passport score</B>
					<Score weight={700}>
						{passportScore === null ? '--' : passportScore}
					</Score>
				</Flex>
			)}
			<P>
				Verify your Gitcoin Passport to prove your donor uniqueness and
				ensure your donations get matched in quadratic funding rounds.
			</P>
			<Hr></Hr>
			<StyledPassportButton
				state={passportState}
				handleSign={handleSign}
				refreshScore={refreshScore}
			/>
		</StyledContributeCardBox>
	);
};

const StyledContributeCardBox = styled(ContributeCardBox)`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Score = styled(H3)`
	color: ${neutralColors.gray[800]};
`;

const Hr = styled.div`
	height: 1px;
	background-color: ${neutralColors.gray[300]};
	width: 100%;
`;

const StyledPassportButton = styled(PassportButton)`
	width: fit-content;
`;