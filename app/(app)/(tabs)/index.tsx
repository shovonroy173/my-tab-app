import { router } from "expo-router";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import { ComposerCard } from "@/src/features/social/components/composer-card";
import { PostCard } from "@/src/features/social/components/post-card";
import { ProfileChip } from "@/src/features/social/components/profile-chip";
import { useSocial } from "@/src/features/social/social-context";
import { rh } from "@/src/shared/theme/responsive";
import { colors, spacing, typography } from "@/src/shared/theme/tokens";
import { Screen } from "@/src/shared/ui/screen";

export default function FeedScreen() {
  const { createPost, feedPosts, profilesById, recommendedProfiles } =
    useSocial();

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={feedPosts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.hero}>
              <Text style={styles.eyebrow}>Social MVP</Text>
              <Text style={styles.title}>
                A focused feed, creator network, and detailed profiles.
              </Text>
              <Text style={styles.subtitle}>
                Users can publish posts, follow creators, and explore profile
                depth without needing a backend yet.
              </Text>
            </View>

            <ComposerCard
              onSubmit={async (content) => {
                try {
                  await createPost(content);
                } catch (error) {
                  Alert.alert(
                    "Unable to post",
                    error instanceof Error
                      ? error.message
                      : "Please try again.",
                  );
                }
              }}
            />

            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Suggested creators</Text>
            </View>
            <FlatList
              data={recommendedProfiles}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.peopleRow}
              renderItem={({ item }) => (
                <ProfileChip
                  profile={item}
                  onPress={() => router.push(`/(app)/profile/${item.handle}`)}
                />
              )}
            />

            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>Latest posts</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <PostCard
            post={item}
            author={profilesById[item.authorId]}
            onPressAuthor={(handle) => router.push(`/(app)/profile/${handle}`)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.xl,
  },
  header: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  hero: {
    gap: spacing.md,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    color: colors.text,
    fontSize: typography.titleLarge,
    fontWeight: "800",
    letterSpacing: -1,
    lineHeight: rh(40),
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: rh(23),
  },
  sectionRow: {
    marginTop: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: "700",
  },
  peopleRow: {
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
  separator: {
    height: spacing.md,
  },
});
