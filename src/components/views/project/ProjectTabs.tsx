import {
	Subline,
	brandColors,
	P,
	neutralColors,
} from '@giveth/ui-design-system';
import styled from 'styled-components';

import { useIntl } from 'react-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { mediaQueries } from '@/lib/constants/constants';
import { Shadow } from '@/components/styled-components/Shadow';
import { useProjectContext } from '@/context/project.context';
import { Flex } from '@/components/styled-components/Flex';
import Routes from '@/lib/constants/Routes';
import { EProjectPageTabs } from './ProjectIndex';
import { compareAddresses } from '@/lib/helpers';
import { useAppSelector } from '@/features/hooks';

interface IProjectTabs {
	activeTab: EProjectPageTabs;
	slug: string;
	totalDonations?: number;
}

const badgeCount = (count?: number) => {
	return count || null;
};

const ProjectTabs = (props: IProjectTabs) => {
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const { projectData, boostersData } = useProjectContext();
	const { activeTab, slug, totalDonations } = props;
	const { totalProjectUpdates, adminUser } = projectData || {};
	const { formatMessage } = useIntl();
	const { userData: user } = useAppSelector(state => state.user);

	const baseTabsArray = [
		{ title: 'label.about', query: EProjectPageTabs.ABOUT },
		{
			title: 'label.updates',
			badge: totalProjectUpdates,
			query: EProjectPageTabs.UPDATES,
		},
		{
			title: 'label.donations',
			badge: totalDonations,
			query: EProjectPageTabs.DONATIONS,
		},
	];

	const tabsArray = isAdmin
		? [
				{ title: 'label.dashboard', query: EProjectPageTabs.DASHBOARD },
				...baseTabsArray,
		  ]
		: [...baseTabsArray];

	useEffect(() => {
		setIsAdmin(
			compareAddresses(adminUser?.walletAddress, user?.walletAddress),
		);
	}, [user, adminUser]);

	if (projectData?.verified)
		tabsArray.push({
			title: 'label.givpower',
			badge: boostersData?.powerBoostings.length,
			query: EProjectPageTabs.GIVPOWER,
		});

	return (
		<Wrapper>
			{tabsArray.map((i, index) => (
				<Link
					key={i.title}
					href={`${Routes.Project}/${slug}${
						i.query ? `?tab=${i.query}` : ''
					}`}
					scroll={false}
				>
					<Tab className={activeTab === i.query ? 'active' : ''}>
						{formatMessage({ id: i.title })}
						{badgeCount(i.badge) && <Badge>{i.badge}</Badge>}
					</Tab>
				</Link>
			))}
		</Wrapper>
	);
};

const Badge = styled(Subline)`
	background: ${brandColors.pinky[500]};
	color: white;
	border-radius: 40px;
	height: 22px;
	padding: 0 9px;
	display: flex;
	align-items: center;
	margin-left: 6px;
`;

const Tab = styled(P)`
	display: flex;
	padding: 10px 35px;
	color: ${brandColors.pinky[500]};
	border-radius: 48px;
	cursor: pointer;

	&.active {
		color: ${brandColors.deep[600]};
		background: white;
		box-shadow: ${Shadow.Neutral[400]};
	}
`;

const Wrapper = styled(Flex)`
	padding: 24px 0 24px;
	margin-bottom: 14px;
	color: ${brandColors.deep[600]};
	align-items: center;
	z-index: 1;
	background-color: ${neutralColors.gray[200]};
	flex-wrap: nowrap;
	overflow-x: auto;
	max-width: calc(100vw - 32px);

	${mediaQueries.tablet} {
		padding: 16px 0 24px;
		position: sticky;
		top: 200px;
	}
`;

export default ProjectTabs;
