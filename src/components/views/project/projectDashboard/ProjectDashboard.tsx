import React, { FC, useState } from 'react';
import { Button, GLink } from '@giveth/ui-design-system';
import { Flex } from '@/components/styled-components/Flex';
import { postRequest } from '@/helpers/requests';
import config from '@/configuration';
import { useProjectContext } from '@/context/project.context';

interface IProjectDashboardProps {}

export const ProjectDashboard: FC<IProjectDashboardProps> = () => {
	const [categories, setCategories] = useState('');
	const { projectData } = useProjectContext();

	const handleDetectMyProjectsCategories = async () => {
		setCategories('loading');
		const { result } = await postRequest('/api/ai/categorize', false, {
			url: config.FRONTEND_LINK + '/project/' + projectData?.slug,
		});
		setCategories(result);
	};
	return (
		<Flex flexDirection='column' gap='24px'>
			<Flex flexDirection='column' gap='12px'>
				<Flex alignItems='center' gap='12px'>
					<GLink size='Big'>
						Detect My project&apos;s categories
					</GLink>
					<Button
						label='Detect'
						onClick={handleDetectMyProjectsCategories}
						size='small'
						buttonType='texty-secondary'
					/>
				</Flex>
				<GLink>{categories}</GLink>
			</Flex>
		</Flex>
	);
};
