import React, { FC, useState } from 'react';
import { brandColors, Button, GLink } from '@giveth/ui-design-system';
import styled from 'styled-components';
import { Flex } from '@/components/styled-components/Flex';
import { postRequest } from '@/helpers/requests';
import config from '@/configuration';
import { useProjectContext } from '@/context/project.context';

interface IProjectDashboardProps {}

export const ProjectDashboard: FC<IProjectDashboardProps> = () => {
	const [categories, setCategories] = useState('');
	const [seo, setSeo] = useState('');
	const [desc, setDesc] = useState('');
	const [medium, setMedium] = useState('');
	const { projectData } = useProjectContext();

	const handleDetectMyProjectsCategories = async () => {
		setCategories('Detecting...');
		const { result } = await postRequest('/api/ai/categorize', false, {
			url: config.FRONTEND_LINK + '/project/' + projectData?.slug,
		});
		setCategories(result);
	};

	const handleSeoDesc = async () => {
		setSeo('Generating...');
		const { result } = await postRequest('/api/ai/summarize', false, {
			url: config.FRONTEND_LINK + '/project/' + projectData?.slug,
		});
		setSeo(result);
	};

	const handleSummarizeProjectDesc = async () => {
		setDesc('Generating...');
		const { result } = await postRequest('/api/ai/description', false, {
			url: config.FRONTEND_LINK + '/project/' + projectData?.slug,
		});
		setDesc(result);
	};

	const handleMedium = async () => {
		setMedium("Be patient, I'm Writing something special...");
		const { result } = await postRequest('/api/ai/generate', false, {
			url: config.FRONTEND_LINK + '/project/' + projectData?.slug,
		});
		setMedium(result);
	};
	return (
		<Flex flexDirection='column' gap='24px'>
			<Section flexDirection='column' gap='12px'>
				<Header alignItems='center' gap='12px'>
					<GLink size='Big'>
						Detect My project&apos;s categories
					</GLink>
					<Button
						label='Detect'
						onClick={handleDetectMyProjectsCategories}
						size='small'
						buttonType='texty'
					/>
				</Header>
				<Content>{categories}</Content>
			</Section>
			<Section flexDirection='column' gap='12px'>
				<Header alignItems='center' gap='12px'>
					<GLink size='Big'>
						Summarize My project&apos;s description for SEO
						description&apos;s meta data
					</GLink>
					<Button
						label='Summarize'
						onClick={handleSeoDesc}
						size='small'
						buttonType='texty'
					/>
				</Header>
				<Content>{seo}</Content>
			</Section>
			<Section flexDirection='column' gap='12px'>
				<Header alignItems='center' gap='12px'>
					<GLink size='Big'>
						Summarize My project&apos;s description for project card
					</GLink>
					<Button
						label='Summarize'
						onClick={handleSummarizeProjectDesc}
						size='small'
						buttonType='texty'
					/>
				</Header>
				<Content>{desc}</Content>
			</Section>
			<Section flexDirection='column' gap='12px'>
				<Header alignItems='center' gap='12px'>
					<GLink size='Big'>
						Write a medium Article for my project
					</GLink>
					<Button
						label='Generate'
						onClick={handleMedium}
						size='small'
						buttonType='texty'
					/>
				</Header>
				<Content dangerouslySetInnerHTML={{ __html: medium }}></Content>
			</Section>
		</Flex>
	);
};

const Section = styled(Flex)`
	background-color: white;
	border-radius: 8px;
	overflow: hidden;
`;

const Header = styled(Flex)`
	background-color: ${brandColors.giv[500]};
	padding: 24px;
	color: white;
`;

const Content = styled(GLink)`
	padding: 24px;
`;
