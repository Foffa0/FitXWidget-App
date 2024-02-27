import { ConfigContext, ExpoConfig } from 'expo/config';
import { WithAndroidWidgetsParams } from 'react-native-android-widget';

const widgetConfig = {
  // Paths to all custom fonts used in all widgets
  widgets: [
    {
      name: 'studioWidget', // This name will be the **name** with which we will reference our widget.
      label: 'FitX Widget', // Label shown in the widget picker
      minWidth: '120dp',
      minHeight: '120dp',
      description: 'FitX Studio Auslastung', // Description shown in the widget picker
      previewImage: './assets/icon.png', // Path to widget preview image

      // How often, in milliseconds, that this AppWidget wants to be updated.
      // The task handler will be called with widgetAction = 'UPDATE_WIDGET'.
      // Default is 0 (no automatic updates)
      // Minimum is 1800000 (30 minutes == 30 * 60 * 1000).
      updatePeriodMillis: 1800000,
    },
  ],
};

export default ({ config }) => ({
  ...config,
  name: 'FitXWidget',
  plugins: [['react-native-android-widget', widgetConfig]],
});