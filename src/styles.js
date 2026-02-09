/**
 * 全局样式统一入口
 */

import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const colors = {
  primary: '#007AFF',
  background: '#0d0d0d',
  surface: '#1a1a1a',
  text: '#ffffff',
  textSecondary: '#888888',
  success: '#00ff00',
  error: '#ff3b30',
  border: '#333333',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
    minHeight: 48,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: colors.border,
    opacity: 0.6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  hintText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: spacing.md,
    fontSize: 16,
  },
  terminal: {
    flex: 1,
    padding: spacing.md,
  },
  terminalOutput: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: colors.success,
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  terminalInput: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
    padding: spacing.md,
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'monospace',
    marginRight: spacing.sm,
    minHeight: 48,
  },
  sendButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 8,
    justifyContent: 'center',
    marginRight: spacing.sm,
    minWidth: 60,
  },
  sendButtonDisabled: {
    backgroundColor: colors.border,
    opacity: 0.6,
  },
  sendButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  disconnectButton: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 8,
    justifyContent: 'center',
    minWidth: 60,
  },
  disconnectButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;
