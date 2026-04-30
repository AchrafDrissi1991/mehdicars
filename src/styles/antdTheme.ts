import type { ThemeConfig } from 'antd';
import { colors } from '../theme/colors';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorInfo: colors.info,
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorError: colors.error,
    colorLink: colors.primary,
    colorText: colors.text,
    colorTextSecondary: colors.mutedText,
    colorBgBase: colors.background,
    colorBgLayout: colors.background,
    colorBgContainer: colors.surface,
    colorBorder: colors.border,
    borderRadius: 10,
    controlHeightLG: 48,
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 46,
      controlHeightLG: 48,
      fontWeight: 700,
    },
    Card: {
      borderRadiusLG: 18,
    },
    Input: {
      borderRadius: 12,
      controlHeight: 44,
    },
    Select: {
      borderRadius: 8,
      controlHeight: 44,
    },
    Collapse: {
      headerBg: '#FFFFFF',
    },
  },
};
