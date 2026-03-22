import { router } from "expo-router";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import { useAppSession } from "@/src/features/session/session-context";
import { PostCard } from "@/src/features/social/components/post-card";
import { ProfileSummaryCard } from "@/src/features/social/components/profile-summary-card";
import { useSocial } from "@/src/features/social/social-context";
import { rh } from "@/src/shared/theme/responsive";
import { colors, spacing, typography } from "@/src/shared/theme/tokens";
import { AppButton } from "@/src/shared/ui/app-button";
import { Screen } from "@/src/shared/ui/screen";

export default function ProfileScreen() {
  const { resetDemo, signOut } = useAppSession();
  const { currentProfile, currentUserPosts, profilesById, stats } = useSocial();

  if (!currentProfile) {
    return null;
  }

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={currentUserPosts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <ProfileSummaryCard
              profile={currentProfile}
              stats={stats(currentProfile.id)}
            />
            <View style={styles.actions}>
              <AppButton
                label="Sign out"
                onPress={async () => {
                  await signOut();
                  router.replace("/(public)/sign-in");
                }}
              />
              <AppButton
                label="Reset demo"
                variant="secondary"
                onPress={async () => {
                  await resetDemo();
                  Alert.alert(
                    "Demo reset",
                    "Onboarding and social state have been cleared.",
                    [
                      {
                        text: "Restart flow",
                        onPress: () => router.replace("/(public)/onboarding"),
                      },
                    ],
                  );
                }}
              />
            </View>
            <Text style={styles.sectionTitle}>Your posts</Text>
          </View>
        }
        renderItem={({ item }) => (
          <PostCard
            post={item}
            author={profilesById[item.authorId]}
            onPressAuthor={(handle) => router.push(`/(app)/profile/${handle}`)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Your first post will appear here once you publish it from the feed.
            I will leave it empty for now to show you what the screen looks like
            without any posts. The profile summary card above should have your
            profile information and stats, and the buttons should allow you to
            sign out or reset the demo state.
          </Text>
        }
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
  actions: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: "700",
  },
  empty: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: rh(22),
  },
  separator: {
    height: spacing.md,
  },
});
