import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppButton } from '@/src/shared/ui/app-button';
import { colors, componentSize, radius, spacing, typography } from '@/src/shared/theme/tokens';
import { rh } from '@/src/shared/theme/responsive';

type ComposerCardProps = {
  buttonLabel?: string;
  onSubmit: (content: string) => Promise<void>;
  placeholder?: string;
  title?: string;
};

export function ComposerCard({
  buttonLabel = 'Publish post',
  onSubmit,
  placeholder = 'What are you building, learning, or shipping today?',
  title = 'Share an update',
}: ComposerCardProps) {
  const [content, setContent] = useState('');
  const [busy, setBusy] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        multiline
        numberOfLines={4}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.accent}
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />
      <AppButton
        label={busy ? 'Posting...' : buttonLabel}
        disabled={busy}
        onPress={async () => {
          setBusy(true);
          try {
            await onSubmit(content);
            setContent('');
          } finally {
            setBusy(false);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  title: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: '700',
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: typography.body,
    lineHeight: rh(22),
    minHeight: componentSize.composerMinHeight,
    padding: spacing.md,
    textAlignVertical: 'top',
  },
});
