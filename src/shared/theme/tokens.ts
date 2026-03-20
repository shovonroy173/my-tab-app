import { Theme } from '@react-navigation/native';

import { rf, rh, rw } from '@/src/shared/theme/responsive';

export const colors = {
  accent: '#F97316',
  accentSoft: 'rgba(249, 115, 22, 0.18)',
  background: '#0B1020',
  border: 'rgba(148, 163, 184, 0.18)',
  card: '#121A2E',
  surface: '#172036',
  surfaceStrong: '#11192B',
  text: '#F8FAFC',
  textMuted: '#94A3B8',
  white: '#FFFFFF',
};

export const spacing = {
  xs: rw(4),
  sm: rw(8),
  md: rw(16),
  lg: rw(24),
  xl: rw(32),
  xxl: rw(40),
};

export const radius = {
  sm: rw(18),
  md: rw(20),
  lg: rw(26),
  xl: rw(28),
  pill: rw(999),
};

export const typography = {
  caption: rf(13),
  body: rf(15),
  bodyLarge: rf(16),
  label: rf(14),
  section: rf(18),
  title: rf(24),
  titleLarge: rf(32),
  titleXL: rf(34),
  display: rf(38),
};

export const componentSize = {
  buttonHeight: rh(56),
  fieldHeight: rh(58),
  tabBarHeight: rh(76),
  composerMinHeight: rh(120),
};

export const navigationTheme: Theme = {
  dark: true,
  colors: {
    background: colors.background,
    border: colors.border,
    card: colors.card,
    notification: colors.accent,
    primary: colors.accent,
    text: colors.text,
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
    heavy: {
      fontFamily: 'System',
      fontWeight: '800',
    },
  },
};
