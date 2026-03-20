import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { useAppSession } from '@/src/features/session/session-context';
import { SocialPost, SocialProfile, seedPosts, seedProfiles } from '@/src/features/social/social-data';

type SocialStats = {
  followers: number;
  following: number;
  posts: number;
};

type SocialContextValue = {
  allPosts: SocialPost[];
  createPost: (content: string) => Promise<void>;
  currentProfile: SocialProfile | null;
  currentUserPosts: SocialPost[];
  discoverProfiles: SocialProfile[];
  feedPosts: SocialPost[];
  followUser: (profileId: string) => void;
  followingIds: string[];
  getPostsByProfileId: (profileId: string) => SocialPost[];
  getProfileByHandle: (handle?: string) => SocialProfile | undefined;
  profilesById: Record<string, SocialProfile>;
  recommendedProfiles: SocialProfile[];
  stats: (profileId: string) => SocialStats;
  unfollowUser: (profileId: string) => void;
};

const SocialContext = createContext<SocialContextValue | null>(null);

export function SocialProvider({ children }: PropsWithChildren) {
  const { currentUser } = useAppSession();
  const currentProfile = useMemo(() => buildCurrentUserProfile(currentUser), [currentUser]);
  const [posts, setPosts] = useState<SocialPost[]>(() => seedPosts);
  const [followingIds, setFollowingIds] = useState<string[]>(['u-theo', 'u-amara']);

  useEffect(() => {
    setPosts(seedPosts);
    setFollowingIds(['u-theo', 'u-amara']);
  }, [currentUser?.email]);

  const profiles = useMemo(() => {
    return currentProfile ? [currentProfile, ...seedProfiles] : seedProfiles;
  }, [currentProfile]);

  const profilesById = useMemo(
    () =>
      profiles.reduce<Record<string, SocialProfile>>((accumulator, profile) => {
        accumulator[profile.id] = profile;
        return accumulator;
      }, {}),
    [profiles],
  );

  const currentUserPosts = useMemo(
    () => (currentProfile ? posts.filter((post) => post.authorId === currentProfile.id) : []),
    [currentProfile, posts],
  );

  const feedPosts = useMemo(() => {
    const visibleIds = new Set<string>(followingIds);
    if (currentProfile) {
      visibleIds.add(currentProfile.id);
    }

    return posts.filter((post) => visibleIds.has(post.authorId));
  }, [currentProfile, followingIds, posts]);

  const discoverProfiles = useMemo(
    () => profiles.filter((profile) => profile.id !== currentProfile?.id),
    [currentProfile, profiles],
  );

  const recommendedProfiles = useMemo(() => discoverProfiles.slice(0, 4), [discoverProfiles]);

  const value = useMemo<SocialContextValue>(
    () => ({
      allPosts: posts,
      createPost: async (content: string) => {
        if (!currentProfile) {
          throw new Error('Sign in to create a post.');
        }

        const trimmed = content.trim();
        if (trimmed.length < 8) {
          throw new Error('Write at least 8 characters for a post.');
        }

        const newPost: SocialPost = {
          authorId: currentProfile.id,
          content: trimmed,
          createdAtLabel: 'Just now',
          id: `p-${Date.now()}`,
          likeCount: 0,
        };

        setPosts((current) => [newPost, ...current]);
      },
      currentProfile,
      currentUserPosts,
      discoverProfiles,
      feedPosts,
      followUser: (profileId: string) => {
        if (profileId === currentProfile?.id) {
          return;
        }

        setFollowingIds((current) => (current.includes(profileId) ? current : [...current, profileId]));
      },
      followingIds,
      getPostsByProfileId: (profileId: string) => posts.filter((post) => post.authorId === profileId),
      getProfileByHandle: (handle?: string) => profiles.find((profile) => profile.handle === handle),
      profilesById,
      recommendedProfiles,
      stats: (profileId: string) => ({
        followers:
          (profilesById[profileId]?.followers ?? 0) +
          (profileId !== currentProfile?.id && followingIds.includes(profileId) ? 1 : 0),
        following:
          profileId === currentProfile?.id
            ? followingIds.length
            : profilesById[profileId]?.following ?? 0,
        posts: posts.filter((post) => post.authorId === profileId).length,
      }),
      unfollowUser: (profileId: string) => {
        setFollowingIds((current) => current.filter((id) => id !== profileId));
      },
    }),
    [currentProfile, currentUserPosts, discoverProfiles, feedPosts, followingIds, posts, profiles, profilesById, recommendedProfiles],
  );

  return <SocialContext.Provider value={value}>{children}</SocialContext.Provider>;
}

export function useSocial() {
  const context = useContext(SocialContext);

  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider.');
  }

  return context;
}

function buildCurrentUserProfile(
  currentUser: {
    email: string;
    fullName: string;
  } | null,
): SocialProfile | null {
  if (!currentUser) {
    return null;
  }

  const handle = currentUser.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'you';

  return {
    avatarColor: '#FB7185',
    bio: 'Building a lean social MVP with posting, follows, and profile depth while keeping the codebase ready for backend integration.',
    followers: 128,
    following: 0,
    fullName: currentUser.fullName,
    handle,
    headline: 'Founder mode, shipping daily',
    id: 'u-current',
    interests: ['Founders', 'Mobile', 'Community'],
    location: 'Dhaka, Bangladesh',
  };
}
