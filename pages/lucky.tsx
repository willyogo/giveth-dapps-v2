import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, H4 } from '@giveth/ui-design-system';
import { useAppSelector } from '@/features/hooks';
import { FETCH_USER_DONATIONS } from '@/apollo/gql/gqlUser';
import { client } from '@/apollo/apolloClient';
import styled from 'styled-components';

import StaticProjects from '@/lib/constants/staticProjectsOpenAi';

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const OPENAI_API_BASE_URL = 'https://api.openai.com/v1/chat/completions';

export const generateSuggestion = async (projects: string) => {
	try {
		const response = await axios.post(
			OPENAI_API_BASE_URL,
			{
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content:
							'Your goal is to provide suggestions for donors that are unsure on where to donate.',
					},
					{
						role: 'user',
						content: `I am a donor from Giveth.io and I previously donated to these projects: ${projects}. I would like ONE project suggestion from this list ${StaticProjects}. Please without any introduction just provide your response in this html format giving an anchor with the giveth.io/project/{slug} on medium text please. `,
					},
				],
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${OPENAI_API_KEY}`,
				},
			},
		);
		return response.data.choices[0].message.content;
	} catch (error) {
		console.log('Error generating answer options:', { error });
		return false;
	}
};
function FeelingGenerous() {
	const { userData } = useAppSelector(state => state.user);
	const [donations, setDonations] = useState([]);
	const [titles, setTitles] = useState('');
	const [suggestion, setSuggestions] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const fetchUserDonations = async () => {
			if (!userData) return;
			const { data: userDonations } = await client.query({
				query: FETCH_USER_DONATIONS,
				variables: {
					userId: parseFloat(userData?.id || '') || -1,
					take: 50,
					skip: 0,
					orderBy: 'CreationDate',
					direction: 'DESC',
					status: 'verified',
				},
			});
			let donations: any = [];
			if (userDonations?.donationsByUserId) {
				donations = userDonations.donationsByUserId.donations;
				setDonations(donations);
				const titles = JSON.stringify(
					Array.from(
						new Set(
							donations
								.filter(
									(item: any, index: any) =>
										donations.findIndex(
											(obj: any) =>
												obj.project.title ===
												item.project.title,
										) === index,
								)
								.map((item: any) => item.project.title),
						),
					),
				);
				setTitles(titles);
			}
		};
		fetchUserDonations().then();
	}, [userData]);

	return (
		<Wrapper>
			<Button
				size='large'
				label='I feel generous'
				buttonType='secondary'
				disabled={!titles}
				onClick={async () => {
					if (titles) {
						setIsLoading(true);
						const res = await generateSuggestion(titles);
						setSuggestions(res);
						setIsLoading(false);
					}
				}}
			/>
			{isLoading ? (
				<Box>
					<H4>thinking...</H4>
				</Box>
			) : (
				true && (
					<Box>
						<div
							dangerouslySetInnerHTML={{
								__html: suggestion,
							}}
						/>
					</Box>
				)
			)}
		</Wrapper>
	);
}

export default function FeelingLucky() {
	return <FeelingGenerous />;
}
const Wrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	text-align: center;
	padding: 137px 0;
	position: relative;
	button {
		width: 300px;
	}
`;

const Box = styled.div`
	max-width: 800px;
	margin: 20px auto;
`;
