import { useWindowDimensions } from 'react-native';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { useSocial } from '@/src/features/social/social-context';
import { Screen } from '@/src/shared/ui/screen';
import { colors, radius, spacing, typography } from '@/src/shared/theme/tokens';
import { rh, rw } from '@/src/shared/theme/responsive';

export default function ExploreScreen() {
  const { allPosts, profilesById } = useSocial();
  const { width } = useWindowDimensions();
  const tileSize = (width - rw(24) * 2 - rw(10) * 2) / 3;

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={allPosts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Explore</Text>
            <Text style={styles.title}>Discover posts in a grid-first layout.</Text>
            <Text style={styles.subtitle}>
              This tab leans into an Instagram-style browse pattern so the app has a stronger discovery surface.
            </Text>
          </View>
        }
        renderItem={({ item, index }) => {
          const author = profilesById[item.authorId];

          if (!author) {
            return null;
          }

          return (
            <Pressable
              onPress={() => router.push(`/(app)/profile/${author.handle}`)}
              style={[
                styles.tile,
                {
                  backgroundColor: getTileColor(index),
                  height: tileSize,
                  width: tileSize,
                },
              ]}
            >
              <View style={styles.tileOverlay}>
                <Text numberOfLines={1} style={styles.tileHandle}>
                  @{author.handle}
                </Text>
                <Text numberOfLines={4} style={styles.tileContent}>
                  {item.content}
                </Text>
                <Text style={styles.tileMeta}>{item.likeCount} likes</Text>
              </View>
            </Pressable>
          );
        }}
      />
    </Screen>
  );
}

function getTileColor(index: number) {
  const palette = ['#172036', '#1F2A44', '#26334F', '#2A2344', '#183243', '#2C2C3D'];
  return palette[index % palette.length];
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  header: {
    gap: spacing.md,
    marginBottom: spacing.lg,
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
  row: {
    gap: rw(10),
    marginBottom: rw(10),
  },
  tile: {
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  tileOverlay: {
    backgroundColor: 'rgba(11,16,32,0.22)',
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.sm,
  },
  tileHandle: {
    color: colors.white,
    fontSize: typography.caption,
    fontWeight: '700',
  },
  tileContent: {
    color: colors.white,
    fontSize: typography.label,
    lineHeight: rh(19),
  },
  tileMeta: {
    color: '#D6E4F0',
    fontSize: typography.caption,
    fontWeight: '600',
  },
});
