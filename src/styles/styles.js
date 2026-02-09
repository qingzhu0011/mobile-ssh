/**
 * 全局样式 - 适配安卓移动端
 */

import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// 颜色定义
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

// 间距定义
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// 全局样式
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
  },
  
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  
  terminalText: {
    fontFamily: 'monospace',
    fontSize: 13,
    color: colors.success,
    lineHeight: 18,
  },
  
  inputGroup: {
    marginBottom: spacing.md,
  },
  
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  
  hintText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

// 响应式尺寸
export const responsive = {
  isSmallScreen: width < 360,
  isMediumScreen: width >= 360 && width < 768,
  isLargeScreen: width >= 768,
  screenWidth: width,
  screenHeight: height,
};
