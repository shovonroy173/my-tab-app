import { useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';

import { useAppSession } from '@/src/features/session/session-context';
import { AppButton } from '@/src/shared/ui/app-button';
import { Screen } from '@/src/shared/ui/screen';
import { BrandMark } from '@/src/shared/ui/brand-mark';
import { colors, radius, spacing, typography } from '@/src/shared/theme/tokens';
import { rh, rw } from '@/src/shared/theme/responsive';

const slides = [
  {
    eyebrow: 'A cleaner start',
    title: 'Keep every first-run moment intentional.',
    description:
      'A polished launch screen and guided welcome flow make the product feel stable before users ever create an account.',
    metrics: [
      { value: '01', label: 'branded entry' },
      { value: 'Fast', label: 'first impression' },
    ],
  },
  {
    eyebrow: 'Thoughtful onboarding',
    title: 'Show value before asking for commitment.',
    description:
      'We highlight focus, sync, and progress in a compact narrative so users understand what the app does in seconds.',
    metrics: [
      { value: '03', label: 'guided steps' },
      { value: 'Clear', label: 'product story' },
    ],
  },
  {
    eyebrow: 'Ready for auth',
    title: 'Move from discovery to sign in without friction.',
    description:
      'The onboarding CTA drops users into a complete auth stack with sign in, sign up, and password reset routes already connected.',
    metrics: [
      { value: '01', label: 'auth entry' },
      { value: 'Live', label: 'route guards' },
    ],
  },
];

export default function OnboardingScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const { completeOnboarding } = useAppSession();
  const isLastSlide = activeIndex === slides.length - 1;

  const scrollToSlide = (index: number) => {
    scrollRef.current?.scrollTo({ animated: true, x: index * width });
    setActiveIndex(index);
  };

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(nextIndex);
  };

  const handleContinue = async () => {
    if (!isLastSlide) {
      scrollToSlide(activeIndex + 1);
      return;
    }

    await completeOnboarding();
    router.replace('/(public)/sign-in');
  };

  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <BrandMark />
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={handleScrollEnd}
          style={styles.carousel}
        >
          {slides.map((slide) => (
            <View key={slide.title} style={[styles.slidePage, { width }]}>
              <View style={styles.heroCopy}>
                <Text style={styles.overline}>{slide.eyebrow}</Text>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.description}>{slide.description}</Text>
              </View>

              <View style={styles.previewCard}>
                <View style={styles.previewGlow} />
                <Text style={styles.previewLabel}>Flow preview</Text>
                <View style={styles.metricRow}>
                  {slide.metrics.map((metric) => (
                    <View key={metric.label} style={styles.metricCard}>
                      <Text style={styles.metricValue}>{metric.value}</Text>
                      <Text style={styles.metricLabel}>{metric.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.timeline}>
          {slides.map((slide, index) => (
            <Pressable key={slide.title} onPress={() => scrollToSlide(index)} style={styles.timelineItem}>
              <View style={[styles.timelineDot, index === activeIndex ? styles.timelineDotActive : undefined]} />
              <Text style={[styles.timelineText, index === activeIndex ? styles.timelineTextActive : undefined]}>
                {slide.eyebrow}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((slide, index) => (
            <Pressable key={slide.eyebrow} onPress={() => scrollToSlide(index)}>
              <View style={[styles.paginationDot, index === activeIndex && styles.paginationDotActive]} />
            </Pressable>
          ))}
        </View>

        <AppButton label={isLastSlide ? 'Start with email' : 'Continue'} onPress={handleContinue} />

        <Pressable
          onPress={async () => {
            await completeOnboarding();
            router.replace('/(public)/sign-in');
          }}
        >
          <Text style={styles.skip}>Skip intro</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  hero: {
    gap: spacing.xl,
  },
  carousel: {
    marginHorizontal: -spacing.lg,
  },
  slidePage: {
    gap: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  heroCopy: {
    gap: spacing.md,
  },
  overline: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: typography.display,
    fontWeight: '800',
    letterSpacing: -1.2,
    lineHeight: rh(44),
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.bodyLarge,
    lineHeight: rh(25),
  },
  previewCard: {
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.lg,
    overflow: 'hidden',
    padding: spacing.lg,
    position: 'relative',
  },
  previewGlow: {
    backgroundColor: colors.accentSoft,
    borderRadius: rw(140),
    height: rh(140),
    position: 'absolute',
    right: -30,
    top: -30,
    width: rw(140),
  },
  previewLabel: {
    color: colors.textMuted,
    fontSize: typography.label,
    fontWeight: '600',
  },
  metricRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metricCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    flex: 1,
    gap: 4,
    padding: spacing.md,
  },
  metricValue: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '800',
  },
  metricLabel: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
  timeline: {
    gap: spacing.md,
  },
  timelineItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  timelineDot: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.pill,
    height: rh(10),
    width: rw(10),
  },
  timelineDotActive: {
    backgroundColor: colors.accent,
  },
  timelineText: {
    color: colors.textMuted,
    fontSize: typography.label,
    fontWeight: '600',
  },
  timelineTextActive: {
    color: colors.text,
  },
  footer: {
    gap: spacing.md,
  },
  pagination: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  paginationDot: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: radius.pill,
    height: rh(8),
    width: rw(26),
  },
  paginationDotActive: {
    backgroundColor: colors.accent,
  },
  skip: {
    color: colors.textMuted,
    fontSize: typography.label,
    fontWeight: '600',
    textAlign: 'center',
  },
});
