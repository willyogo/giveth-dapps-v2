import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(animal: string) {
	const capitalizedAnimal =
		animal[0].toUpperCase() + animal.slice(1).toLowerCase();
	return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}

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

	const animal = req.body.animal || 'DOG';
	// if (animal.trim().length === 0) {
	// 	res.status(400).json({
	// 		error: {
	// 			message: 'Please enter a valid animal',
	// 		},
	// 	});
	// 	return;
	// }

	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'user',
					content: `Hi,
				we have these categories: 
				Art & Culture with these subcategories:art, culture.
				Community with these subcategories: Family & Children, Food, Grassroots,Housing,Partnerships, Peace & Justice,Public Goods, Social Services, Water & Sanitation.
				Economics & Infrastructure  with these subcategories: caret right, Employment, Industry & Innovation, Infrastructure, Poverty, Real Estate,UBI.
				Education with these subcategories: Tech,Schooling.
				Environment & Energy  with these subcategories: Climate Action, Energy,Ocean,Sustainable Cities & Communities.
				Equality with these subcategories: BIPOC Communities,Gender Equality,Inclusion.
				Finance with these subcategories: Fundraising, Refi.
				Health & Wellness with these subcategories: Children Health,Health Care,Mental Health,Nutrition.
				Nature with these subcategories: Agriculture,Air,Animalsm,Conservation & Biodiversity.
				NGO with this subcategory: Registered Non-Profits.
				Technology with these subcategories:DeSci,Research,Tech.
				I want you to do these tasks:
				1. read the below project's description and detect it's categories and subcategories.
				2. summarize it in 120 characters and use donate keyword on it.
				3. summarize it in 40 word.
				4. write an SEO-friendly article in html format about it with 2400 words, that encourage user to donate this project on giveth.io and link to it.
				Greetings Beautiful Worldwide Family of Earths Children.
				We give home to the broadest ethnobotanical collection in Costa Rica. At our sanctuary we prioritize the care and propagation of endangered, endemic and overexploited plant species to enable long lasting ecosystemic diversity and resilience.
				Our center is focused on education around rare botanical species as well as the cultural practices these plants have inspired around the globe. Our mission is to promote a generalized ethic of conservation, land stewardship, respect for traditional ecological knowledge and the Indigenous peoples that steward this wisdom. The growing collections at the Living Library benefit from both traditional and scientific management techniques.
				With widespread environmental degradation and fragmentation of ecosystems, this center and others like it, are incredibly important archives of diversity that are being threatened in the natural world.
				Collections like the one housed at the Living Library will ensure that these medicines are not lost in the future planet. It's time to gather our resources and create these sanctuaries to protect the ecological heirlooms that our descendants will one day inherit.
				Your contributions will help us in fortifying the Center as whole. We are seeking to support the greenhouse infrastructure we already have on-site, as well as expand the number of Greenhouses so we can steward bigger populations of these rare and overexploited plants. Some of our priorities in this area include:			
				Upgrade our humble sanctuary infrastructure into temples that reflect the great beings we host.
				Finalize our community hosting space. Complete our Schoolhouse.
				Fix our farm truck and soon purchase a vehicle capable of expanding our reach to many other centers.
				Dormitory space for more students.
				Salary for our startup crew. No longer to give their time freely but to be reimbursed for their excellence.
				One of the main pillars in our work is the propagation of knowledge; how to care for these rare plants, how to process them into medicine but also how to engage with the cultural traditions that they carry.
				We have a vast network of Indigenous peoples that we work with in Costa Rica, Mexico and Brazil. It is important that our project is guided by the principles of these tribes and we actively bring in Elders for wisdom exchange around stewardship practices. This creates a mutually beneficial symbiosis where we support Indigenous communities through spreading their message, returning plants to them and providing platforms for financial growth. Bringing them to our center helps us to stay aligned to the traditions living within the plants. It allows us to bring our stewardship to a more whole level that's not limited to just botanical preservation but also wisdom integration. This is endangered cultural knowledge that was passed down from hand to hand, and through our work, we continue to build those links that will carry us into the future. 
				To fortify this element of our project, we offer internships that make both the botanical information and cultural knowledge accessible to passionate students around the world. We are in the process of expanding our Internship program which will enable us to spread these messages to more people. Your contributions will help us to grow the program by supporting the renovation of a building on-site that will be designated as dorm space- allowing us to have more interns and volunteers on-site for our preservation work. The expansion of the internship program also means bringing in Elders and Teachers more frequently to share their cultural practices and growing techniques. We'd like to have more of an ability to provide ample compensation both to the visiting Elders and the other staff on our team who have been dedicating their time and energy on a volunteer basis for the entirety of our project. 
				This funding Initiative is meant to be a pulse of extra power to help support the inevitable expansion of the Library's work. These donations will ensure we are on a path to sustainable independence and can internally generate funds going forward. `,
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
