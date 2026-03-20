import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SocialAvatar } from '@/src/features/social/components/social-avatar';
import { SocialPost, SocialProfile } from '@/src/features/social/social-data';
import { colors, radius, spacing, typography } from '@/src/shared/theme/tokens';
import { rh } from '@/src/shared/theme/responsive';

type PostCardProps = {
  author?: SocialProfile;
  onPressAuthor: (handle: string) => void;
  post: SocialPost;
};

export function PostCard({ author, onPressAuthor, post }: PostCardProps) {
  if (!author) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Pressable onPress={() => onPressAuthor(author.handle)} style={styles.header}>
        <SocialAvatar profile={author} />
        <View style={styles.headerCopy}>
          <Text style={styles.name}>{author.fullName}</Text>
          <Text style={styles.meta}>
            @{author.handle} · {post.createdAtLabel}
          </Text>
        </View>
      </Pressable>
      <Text style={styles.content}>{post.content}</Text>
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Ionicons color={colors.textMuted} name="heart-outline" size={16} />
          <Text style={styles.footerLabel}>{post.likeCount}</Text>
        </View>
        <View style={styles.footerItem}>
          <Ionicons color={colors.textMuted} name="chatbubble-outline" size={16} />
          <Text style={styles.footerLabel}>Discuss</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  headerCopy: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700',
  },
  meta: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  content: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: rh(24),
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  footerItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  footerLabel: {
    color: colors.textMuted,
    fontSize: typography.caption,
    fontWeight: '600',
  },
});
