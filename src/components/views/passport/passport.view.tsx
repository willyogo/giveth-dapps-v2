import {
	B,
	Col,
	Container,
	H2,
	H3,
	H5,
	IconExternalLink16,
	IconPassport32,
	Lead,
	P,
	Row,
	brandColors,
	neutralColors,
} from '@giveth/ui-design-system';
import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import ExternalLink from '@/components/ExternalLink';
import { Flex, FlexCenter } from '@/components/styled-components/Flex';
import { EPassportState, usePassport } from '@/hooks/usePassport';
import {
	PassportBannerData,
	PassportBannerWrapper,
} from '@/components/PassportBanner';
import { PassportButton } from '@/components/PassportButton';
import links from '@/lib/constants/links';

export const PassportView = () => {
	const { formatMessage, locale } = useIntl();
	const { info, handleSign, refreshScore } = usePassport();

	const { passportScore, passportState, currentRound } = info;

	const isScoreReady =
		passportState !== EPassportState.NOT_CONNECTED &&
		passportState !== EPassportState.NOT_SIGNED &&
		passportState !== EPassportState.LOADING;

	return (
		<Container>
			<Wrapper>
				<Title>Amplify your donation</Title>
				<PassportRow>
					<IconPassport32 />
					<H5 weight={700}>Gitcoin Passport</H5>
				</PassportRow>
				<Lead>
					Unlock matching for your donation by verifying your
					identity! Connect your wallet to Gitcoin Passport to check
					your identity score and maximize your donation power.
					Passport is designed to proactively verify users’ identities
					to protect against Sybil attacks.
				</Lead>
				<PassportLink>
					<ExternalLink href={links.PASSPORT} title='Learn more' />
					<IconExternalLink16 />
				</PassportLink>
				<PassportButton
					state={passportState}
					handleSign={handleSign}
					refreshScore={refreshScore}
				/>
				<Row>
					<StyledCol md={9}>
						<InfoBox>
							{isScoreReady && (
								<>
									<InfoRow>
										<B>Your Passport score</B>
										<H3>
											{passportScore !== null
												? passportScore
												: '--'}
										</H3>
									</InfoRow>
									<InfoRow gray>
										<P>Required score</P>
										<H3>
											{currentRound?.minimumPassportScore !==
											undefined
												? currentRound.minimumPassportScore
												: '--'}
										</H3>
									</InfoRow>
								</>
							)}
							<StyledPassportBannerWrapper
								bgColor={PassportBannerData[passportState].bg}
							>
								{PassportBannerData[passportState].icon}
								<P>
									{formatMessage({
										id: PassportBannerData[passportState]
											.content,
									})}
									{currentRound &&
										(passportState ===
											EPassportState.NOT_CREATED ||
											passportState ===
												EPassportState.NOT_ELIGIBLE) && (
											<strong>
												{new Date(currentRound.endDate)
													.toLocaleString(
														locale || 'en-US',
														{
															day: 'numeric',
															month: 'short',
														},
													)
													.replace(/,/g, '')}
											</strong>
										)}
								</P>
							</StyledPassportBannerWrapper>
						</InfoBox>
					</StyledCol>
				</Row>
				<HowBox>
					<HowTitle weight={700}>How it works?</HowTitle>
					<Lead>
						1. Create a Gitcoin Passport if you don’t have one
						already. You will be taken to a new window to begin
						verifying your identity.
					</Lead>
					<Lead>
						2. Verify your identity by collecting various stamps.
					</Lead>
					<Lead>
						3. Return back to this screen and Refresh your score.
					</Lead>
				</HowBox>
			</Wrapper>
		</Container>
	);
};

const Wrapper = styled.div`
	padding: 80px 0;
	text-align: center;
`;

const Title = styled(H2)`
	margin-bottom: 40px;
`;

const PassportRow = styled(FlexCenter)`
	margin-top: 24px;
	margin-bottom: 24px;
	gap: 24px;
`;

const PassportLink = styled(FlexCenter)`
	margin-top: 16px;
	margin-bottom: 60px;
	color: ${brandColors.giv[500]};
	gap: 4px;
`;

const StyledCol = styled(Col)`
	margin: auto;
`;

const InfoBox = styled(Flex)`
	flex-direction: column;
	gap: 11px;
	margin-top: 60px;
`;

interface IInfoRowProps {
	gray?: boolean;
}

const InfoRow = styled(Flex)<IInfoRowProps>`
	justify-content: space-between;
	align-items: center;
	color: ${props => props.gray && neutralColors.gray[700]};
`;

const HowBox = styled(Flex)`
	margin-top: 60px;
	flex-direction: column;
	gap: 24px;
	text-align: left;
`;

const HowTitle = styled(H5)`
	padding-bottom: 24px;
	border-bottom: 1px solid ${neutralColors.gray[400]};
`;

const StyledPassportBannerWrapper = styled(PassportBannerWrapper)`
	border-radius: 16px;
	height: auto;
`;