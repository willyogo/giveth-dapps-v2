import React, { useState } from 'react';
import styled from 'styled-components';
import { B, P, brandColors, neutralColors } from '@giveth/ui-design-system';

import { Flex } from '@/components/styled-components/Flex';

const TabsText = ['GIVsavings Balance', 'Total Volume Locked', 'APY Variation'];

const GivSavingsAccountDetailsTabs = () => {
	const [selectedTab, setSelectedTab] = useState(0);
	return (
		<TabsContainer gap='8px'>
			{TabsText.map((text, index) => (
				<TabItem
					isActive={selectedTab === index}
					onClick={() => setSelectedTab(index)}
					key={index}
				>
					{selectedTab === index ? <B>{text}</B> : <P>{text}</P>}
				</TabItem>
			))}
		</TabsContainer>
	);
};

export default GivSavingsAccountDetailsTabs;

const TabsContainer = styled(Flex)``;

const TabItem = styled.div<{ isActive: boolean }>`
	padding: 9px 24px;
	border-radius: 50px;
	background-color: ${props =>
		props.isActive ? neutralColors.gray[200] : 'transparent'};
	color: ${props =>
		props.isActive ? brandColors.pinky[500] : neutralColors.gray[900]};
	cursor: pointer;
	transition: all 0.2s ease-in;
`;