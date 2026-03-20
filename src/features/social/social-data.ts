export type SocialProfile = {
  avatarColor: string;
  bio: string;
  followers: number;
  following: number;
  fullName: string;
  handle: string;
  headline: string;
  id: string;
  interests: string[];
  location: string;
};

export type SocialPost = {
  authorId: string;
  content: string;
  createdAtLabel: string;
  id: string;
  likeCount: number;
};

export const seedProfiles: SocialProfile[] = [
  {
    avatarColor: '#F97316',
    bio: 'Shipping small social products with a focus on clarity, creator tools, and healthy community loops.',
    followers: 248,
    following: 61,
    fullName: 'Nadia Cruz',
    handle: 'nadiacodes',
    headline: 'Product engineer and indie builder',
    id: 'u-nadia',
    interests: ['Product', 'Community', 'Startups'],
    location: 'Barcelona, Spain',
  },
  {
    avatarColor: '#38BDF8',
    bio: 'Designing motion-rich mobile experiences and documenting the process for teams that ship fast.',
    followers: 517,
    following: 104,
    fullName: 'Theo Park',
    handle: 'theopark',
    headline: 'Mobile design lead',
    id: 'u-theo',
    interests: ['Design systems', 'Motion', 'iOS'],
    location: 'Seoul, South Korea',
  },
  {
    avatarColor: '#22C55E',
    bio: 'Helping founders simplify onboarding and retention with product storytelling and actionable metrics.',
    followers: 392,
    following: 88,
    fullName: 'Amara Singh',
    handle: 'amaras',
    headline: 'Growth strategist',
    id: 'u-amara',
    interests: ['Growth', 'Analytics', 'SaaS'],
    location: 'Singapore',
  },
  {
    avatarColor: '#A78BFA',
    bio: 'Backend-first engineer translating technical depth into features users can feel in the UI.',
    followers: 305,
    following: 47,
    fullName: 'Luca Moretti',
    handle: 'lucam',
    headline: 'Platform engineer',
    id: 'u-luca',
    interests: ['Infra', 'APIs', 'Reliability'],
    location: 'Milan, Italy',
  },
];

export const seedPosts: SocialPost[] = [
  {
    authorId: 'u-nadia',
    content: 'A solid MVP social app needs three things before scale: clear posting, lightweight identity, and feedback loops people understand instantly.',
    createdAtLabel: '2h ago',
    id: 'p-1',
    likeCount: 32,
  },
  {
    authorId: 'u-theo',
    content: 'Design note: if your onboarding tells a story, the feed should continue the same energy instead of dropping into a generic empty state.',
    createdAtLabel: '4h ago',
    id: 'p-2',
    likeCount: 54,
  },
  {
    authorId: 'u-amara',
    content: 'Follow suggestions work best when they feel editorial, not random. A small curated network can outperform a noisy recommendation engine early on.',
    createdAtLabel: 'Yesterday',
    id: 'p-3',
    likeCount: 41,
  },
  {
    authorId: 'u-luca',
    content: 'I love MVPs that model production structure from day one. It keeps feature work faster when auth, social graph, and profiles inevitably expand.',
    createdAtLabel: 'Yesterday',
    id: 'p-4',
    likeCount: 29,
  },
];
