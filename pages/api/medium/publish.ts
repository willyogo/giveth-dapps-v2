import { NextApiRequest, NextApiResponse } from 'next';

const headers = {
	Host: 'api.medium.com',
	Authorization: `Bearer ${process.env.MEDIUM_API_KEY}`,
	'Content-Type': 'application/json',
	Accept: 'application/json',
	'Accept-Charset': 'utf-8',
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (!process.env.MEDIUM_API_KEY) {
		res.status(500).json({
			error: {
				message: 'MEDIUM API KEY not configured',
			},
		});
		return;
	}
	if (!process.env.MEDIUM_USER_ID) {
		res.status(500).json({
			error: {
				message: 'MEDIUM USER ID not configured',
			},
		});
		return;
	}

	const content = req.body.content || '<p>Test</p>';
	const title = req.body.title;

	console.log('content', content);
	console.log('title', title);

	const result = await fetch(
		`https://api.medium.com/v1/users/${process.env.MEDIUM_USER_ID}/posts`,
		{
			method: 'POST',
			headers,
			body: JSON.stringify({
				title: title,
				contentFormat: 'html',
				content: content,
				tags: ['web3', 'donate', 'giveth', 'giveth.io', 'giveth-dapp'],
				publishStatus: 'public',
			}),
		},
	);

	const data = await result.json();
	console.log('data', data);
	res.status(200).json({
		result: data || '',
	});
}
