import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (!configuration.apiKey) {
		res.status(500).json({
			error: {
				message:
					'OpenAI API key not configured, please follow instructions in README.md',
			},
		});
		return;
	}

	const url =
		req.body.url || 'https://giveth.io/project/basic-school-supplies';

	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'user',
					content: `Please read the following website and summarize it in 30 words. this is the website: ${url}`,
				},
			],
			temperature: 0.7,
		});
		console.log(
			'completion.data.choices[0].message?.content',
			completion.data.choices[0].message?.content,
		);
		res.status(200).json({
			result: completion.data.choices[0].message?.content || '{}',
		});
	} catch (error: any) {
		// Consider adjusting the error handling logic for your use case
		if (error.response) {
			console.error(error.response.status, error.response.data);
			res.status(error.response.status).json(error.response.data);
		} else {
			console.error(`Error with OpenAI API request: ${error.message}`);
			res.status(500).json({
				error: {
					message: 'An error occurred during your request.',
				},
			});
		}
	}
}
