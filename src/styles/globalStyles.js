/**
 * 全局样式定义
 * 统一应用的颜色、字体、间距等
 */

import {StyleSheet} from 'react-native';

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

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
  caption: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  monospace: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.success,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: colors.border,
  },
});
