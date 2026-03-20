import { StyleSheet, Text, View } from 'react-native';

import { SocialProfile } from '@/src/features/social/social-data';
import { colors } from '@/src/shared/theme/tokens';

type SocialAvatarProps = {
  profile: SocialProfile;
  size?: number;
};

export function SocialAvatar({ profile, size = 48 }: SocialAvatarProps) {
  return (
    <View style={[styles.avatar, { backgroundColor: profile.avatarColor, height: size, width: size, borderRadius: size / 2 }]}>
      <Text style={[styles.label, { fontSize: size / 2.6 }]}>{profile.fullName.charAt(0)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.white,
    fontWeight: '800',
  },
});
