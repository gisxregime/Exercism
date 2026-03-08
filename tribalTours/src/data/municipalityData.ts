export interface TouristSpot {
  name: string;
  description: string;
  category: string;
}

export interface Municipality {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  touristSpots: TouristSpot[];
}

export const municipalitiesData: Municipality[] = [
{
  id: 'tagum',
  name: 'Tagum City',
  tagline: 'The City of Palms',
  description:
  'A vibrant city known for its festivals, night markets, and the sprawling Hijo Plantation. Tagum City is the cultural and economic hub of Davao del Norte, offering a mix of urban energy and natural beauty.',
  image: 'Tagum City',
  touristSpots: [
  {
    name: 'Hijo Estate Resorts',
    description:
    'A sprawling eco-agri tourism destination with a pristine beach and lush forest.',
    category: 'Nature & Resort'
  },
  {
    name: 'Tagum Night Market',
    description:
    'A bustling market offering a wide array of local street food and goods.',
    category: 'Food & Culture'
  },
  {
    name: 'Energy Park',
    description:
    'A massive green space perfect for biking, picnics, and outdoor activities.',
    category: 'Parks & Recreation'
  },
  {
    name: 'Christ the King Cathedral',
    description: 'Home to the largest wooden rosary in the world.',
    category: 'Heritage'
  }]

},
{
  id: 'samal',
  name: 'Samal Island',
  tagline: 'Island Garden City',
  description:
  'A tropical paradise boasting pristine beaches, vibrant coral gardens, and fascinating bat caves. Samal Island is the premier destination for sun-seekers and underwater explorers.',
  image: 'Samal Island',
  touristSpots: [
  {
    name: 'Monfort Bat Sanctuary',
    description:
    'Home to millions of Rousette fruit bats, holding a Guinness World Record.',
    category: 'Nature & Wildlife'
  },
  {
    name: 'Hagimit Falls',
    description:
    'A series of cascading waterfalls with natural pools perfect for swimming.',
    category: 'Nature'
  },
  {
    name: 'Pearl Farm Beach Resort',
    description:
    'A luxurious resort showcasing authentic Mindanaoan architecture and pristine waters.',
    category: 'Resort'
  },
  {
    name: 'Coral Garden',
    description:
    'A vibrant underwater sanctuary teeming with marine life, ideal for snorkeling.',
    category: 'Adventure'
  }]

},
{
  id: 'panabo',
  name: 'Panabo City',
  tagline: 'Banana Capital of the World',
  description:
  'Famous for its vast banana plantations and thriving aquaculture. Panabo City offers a unique blend of agricultural tourism and coastal attractions.',
  image: 'Panabo City',
  touristSpots: [
  {
    name: 'Panabo Mangrove Park',
    description:
    'A protected coastal area offering boardwalks through dense mangrove forests.',
    category: 'Nature'
  },
  {
    name: 'Banana Plantations',
    description:
    "Vast agricultural lands showcasing the city's primary export industry.",
    category: 'Agri-Tourism'
  },
  {
    name: 'Panabo City Museum',
    description:
    'A cultural hub preserving the history and heritage of the city.',
    category: 'Culture'
  }]

},
{
  id: 'kapalong',
  name: 'Kapalong',
  tagline: 'Adventure Hub of the North',
  description:
  'A haven for thrill-seekers, featuring the famous Okbot Cave, stunning waterfalls, and challenging mountain trails. Kapalong is where untamed nature meets adventure.',
  image: 'Kapalong',
  touristSpots: [
  {
    name: 'Okbot Cave',
    description:
    'A magnificent cave system with stunning stalactite and stalagmite formations.',
    category: 'Adventure'
  },
  {
    name: 'Sua-on Underground River',
    description:
    'An exciting subterranean river perfect for spelunking and exploration.',
    category: 'Adventure'
  },
  {
    name: 'Tigbao Waterfall',
    description:
    'A hidden gem offering a refreshing escape in the heart of the forest.',
    category: 'Nature'
  }]

},
{
  id: 'carmen',
  name: 'Carmen',
  tagline: 'The Agricultural Town',
  description:
  'A peaceful municipality characterized by its expansive rice terraces and relaxing hot springs. Carmen provides a serene escape into rural life.',
  image: 'Carmen',
  touristSpots: [
  {
    name: 'Ising Peace Memorial',
    description:
    'A historical landmark commemorating the Battle of Ising during WWII.',
    category: 'Heritage'
  },
  {
    name: 'Carmen Rice Terraces',
    description:
    'Beautifully carved agricultural landscapes showcasing local farming.',
    category: 'Agri-Tourism'
  },
  {
    name: 'Local Hot Springs',
    description:
    'Natural thermal pools offering relaxation and therapeutic benefits.',
    category: 'Nature & Wellness'
  }]

},
{
  id: 'new-corella',
  name: 'New Corella',
  tagline: "Nature's Paradise",
  description:
  'Blessed with an abundance of water resources, New Corella is famous for the multi-tiered Panas Waterfalls, mysterious caves, and crystal-clear rivers.',
  image: 'New Corella',
  touristSpots: [
  {
    name: 'Panas Waterfalls',
    description:
    'A spectacular multi-tiered waterfall surrounded by lush vegetation.',
    category: 'Nature'
  },
  {
    name: 'Rickan Resort',
    description:
    'A popular local destination featuring natural spring water pools.',
    category: 'Resort'
  },
  {
    name: 'Six Caves System',
    description:
    'A network of interconnected caves offering varying levels of spelunking difficulty.',
    category: 'Adventure'
  }]

},
{
  id: 'talaingod',
  name: 'Talaingod',
  tagline: 'Heart of Indigenous Culture',
  description:
  'Home to the Ata-Manobo tribe, Talaingod offers a deep dive into indigenous culture and breathtaking views along the Mt. Apo trails.',
  image: 'Talaingod',
  touristSpots: [
  {
    name: 'Ata-Manobo Cultural Village',
    description:
    'An immersive experience into the traditions, crafts, and lifestyle of the indigenous people.',
    category: 'Culture'
  },
  {
    name: 'Uguis Peak',
    description:
    'A challenging mountain trail offering panoramic views of the province.',
    category: 'Adventure'
  },
  {
    name: 'Kilometer 73 Viewpoint',
    description:
    'A scenic stopover providing breathtaking vistas of the mountain ranges.',
    category: 'Nature'
  }]

},
{
  id: 'asuncion',
  name: 'Asuncion',
  tagline: 'The Heritage Town',
  description:
  'A town steeped in history, featuring old churches and expansive farmlands. Asuncion is a testament to the enduring spirit of the Dabaonon people.',
  image: 'Asuncion',
  touristSpots: [
  {
    name: 'Asuncion Public Plaza',
    description:
    'The bustling center of the town, perfect for experiencing local daily life.',
    category: 'Culture'
  },
  {
    name: 'Saug River',
    description:
    'A vital waterway offering scenic views and local fishing activities.',
    category: 'Nature'
  },
  {
    name: 'Local Farmlands',
    description:
    "Expansive agricultural areas showcasing the town's primary livelihood.",
    category: 'Agri-Tourism'
  }]

},
{
  id: 'santo-tomas',
  name: 'Santo Tomas',
  tagline: 'Eco-Tourism Frontier',
  description:
  'An emerging eco-tourism destination highlighted by the serene Lake Leonard and various nature parks. Santo Tomas is perfect for nature lovers.',
  image: 'Santo Tomas',
  touristSpots: [
  {
    name: 'Lake Leonard',
    description:
    'A tranquil crater lake surrounded by dense forests, ideal for boating and relaxation.',
    category: 'Nature'
  },
  {
    name: 'Talaingod-Santo Tomas Border Trails',
    description: 'Scenic hiking routes connecting the two municipalities.',
    category: 'Adventure'
  },
  {
    name: 'Eco-Parks',
    description:
    'Various community-managed parks promoting sustainable tourism and conservation.',
    category: 'Eco-Tourism'
  }]

}];