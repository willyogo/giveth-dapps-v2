import {
	Subline,
	H3,
	H4,
	neutralColors,
	Caption,
	B,
	P,
	IconChevronRight16,
	brandColors,
	mediaQueries,
} from '@giveth/ui-design-system';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import LottieControl from '@/components/LottieControl';
import LoadingAnimation from '@/animations/loading_giv.json';
import { useProjectContext } from '@/context/project.context';
import { useAppSelector } from '@/features/hooks';
import { Flex } from '@/components/styled-components/Flex';
import useMediaQuery from '@/hooks/useMediaQuery';
import { device } from '@/lib/constants/constants';

export const DonateSection = () => {
	const { isLoading } = useAppSelector(state => state.user);
	const { formatMessage, locale } = useIntl();
	const { projectData, totalDonationsCount } = useProjectContext();
	const { totalDonations } = projectData || {};
	const isMobile = !useMediaQuery(device.tablet);

	if (isLoading) {
		return <LottieControl animationData={LoadingAnimation} size={300} />;
	}

	return (
		<DonationSectionWrapper gap='24px'>
			{totalDonations && totalDonations !== 0 ? (
				<DonateInfo>
					{isMobile && <br />}
					<Title>
						{formatMessage({
							id: 'label.amount_raised',
						})}
					</Title>
					<Amount weight={700}>
						${totalDonations.toLocaleString(locale)}
					</Amount>
					<Description>
						{formatMessage({
							id: 'label.raised_from',
						})}
						<Caption medium>{totalDonationsCount}</Caption>
						{formatMessage(
							{
								id: 'label.contributors',
							},
							{
								count: totalDonationsCount,
							},
						)}
					</Description>
				</DonateInfo>
			) : (
				<DonateInfo>
					<NoFund weight={700}>
						{formatMessage({
							id: 'label.donate_first_lead_the_way',
						})}
					</NoFund>
				</DonateInfo>
			)}
			<DonateDescription flexDirection='column' gap='8px'>
				<B>100% to the project. Always.</B>
				<P>
					Every donation is peer-to-peer, with no fees and no
					middlemen.
				</P>
				<a href='/' target='_blank' referrerPolicy='no-referrer'>
					<LearnLink alignItems='center' gap='2px'>
						<Subline>Learn about our zero-fee policy</Subline>
						<IconChevronRight16 />
					</LearnLink>
				</a>
			</DonateDescription>
		</DonationSectionWrapper>
	);
};

const Title = styled(Subline)`
	margin-bottom: 8px;
`;

const Amount = styled(H3)`
	margin-bottom: 4px;
`;

const Description = styled(Caption)`
	color: ${neutralColors.gray[700]};
	margin-bottom: 24px;
	& > div {
		color: ${neutralColors.gray[900]};
		display: inline;
	}
`;

const DonationSectionWrapper = styled(Flex)`
	justify-content: space-between;
	flex-direction: column;
	${mediaQueries.tablet} {
		flex-direction: row;
	}
	${mediaQueries.laptopS} {
		flex-direction: column;
	}
`;

const DonateInfo = styled.div`
	height: 130px;
`;

const NoFund = styled(H4)`
	color: ${neutralColors.gray[800]};
	margin-top: 16px;
`;

const DonateDescription = styled(Flex)`
	padding: 8px 16px;
	border: 1px solid ${neutralColors.gray[300]};
	border-radius: 16px;
	margin-bottom: 24px;
`;

const LearnLink = styled(Flex)`
	color: ${brandColors.pinky[500]};
	&:hover {
		color: ${brandColors.pinky[700]};
	}
`;