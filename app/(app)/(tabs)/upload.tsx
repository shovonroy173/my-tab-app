import { Alert, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { ComposerCard } from '@/src/features/social/components/composer-card';
import { useSocial } from '@/src/features/social/social-context';
import { Screen } from '@/src/shared/ui/screen';
import { colors, radius, spacing, typography } from '@/src/shared/theme/tokens';
import { rh } from '@/src/shared/theme/responsive';

const uploadTips = [
  'Share product updates, launch notes, or quick behind-the-scenes progress.',
  'Short posts work best for this MVP, but thoughtful context usually performs better.',
  'After publishing, your new post shows up in both your profile and your feed.',
];

export default function UploadScreen() {
  const { createPost } = useSocial();

  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Upload</Text>
        <Text style={styles.title}>Publish something worth following.</Text>
        <Text style={styles.subtitle}>
          This tab gives posting its own dedicated flow, which makes the MVP feel much closer to a real social app.
        </Text>
      </View>

      <ComposerCard
        title="Create a post"
        placeholder="Tell people what you are building, testing, learning, or launching..."
        buttonLabel="Upload post"
        onSubmit={async (content) => {
          try {
            await createPost(content);
            Alert.alert('Post uploaded', 'Your update is now live in the feed.', [
              { text: 'View profile', onPress: () => router.push('/(app)/(tabs)/profile') },
            ]);
          } catch (error) {
            Alert.alert('Unable to upload', error instanceof Error ? error.message : 'Please try again.');
          }
        }}
      />

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Posting tips</Text>
        {uploadTips.map((tip) => (
          <View key={tip} style={styles.tipRow}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    gap: spacing.lg,
    paddingVertical: spacing.xl,
  },
  hero: {
    gap: spacing.md,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: typography.titleLarge,
    fontWeight: '800',
    letterSpacing: -1,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: rh(23),
  },
  tipCard: {
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  tipTitle: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: '700',
  },
  tipRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tipDot: {
    backgroundColor: colors.accent,
    borderRadius: radius.pill,
    height: rh(8),
    marginTop: rh(8),
    width: rh(8),
  },
  tipText: {
    color: colors.textMuted,
    flex: 1,
    fontSize: typography.body,
    lineHeight: rh(22),
  },
});
