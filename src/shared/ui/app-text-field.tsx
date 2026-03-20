import { ComponentProps, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, componentSize, radius, spacing, typography } from '@/src/shared/theme/tokens';

type AppTextFieldProps = ComponentProps<typeof TextInput> & {
  label: string;
};

export function AppTextField({ label, secureTextEntry, ...props }: AppTextFieldProps) {
  const [isSecure, setIsSecure] = useState(Boolean(secureTextEntry));

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputShell}>
        <TextInput
          placeholderTextColor={colors.textMuted}
          selectionColor={colors.accent}
          style={styles.input}
          secureTextEntry={isSecure}
          {...props}
        />
        {secureTextEntry ? (
          <Pressable onPress={() => setIsSecure((current) => !current)}>
            <Text style={styles.toggle}>{isSecure ? 'Show' : 'Hide'}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.sm,
  },
  label: {
    color: colors.text,
    fontSize: typography.label,
    fontWeight: '700',
  },
  inputShell: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: componentSize.fieldHeight,
    paddingHorizontal: spacing.md,
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: typography.bodyLarge,
    paddingVertical: spacing.md,
  },
  toggle: {
    color: colors.accent,
    fontSize: typography.caption,
    fontWeight: '700',
  },
});
