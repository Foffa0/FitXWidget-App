import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'expo-dev-client';
import { useNavigationContainerRef } from 'expo-router';
import {useEffect} from 'react';
import * as Sentry from '@sentry/react-native';

//SplashScreen.preventAutoHideAsync();

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

Sentry.init({
  dsn: 'https://4776fde8644175c12b2abd1192c53044@o4506961485955072.ingest.us.sentry.io/4506961487724544',
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      // ...
    }),
  ],
});

const Layout = () => {
    /*const [fontsLoaded, fontError] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }*/

    const ref = useNavigationContainerRef();

    useEffect(() => {
        if (ref) {
          routingInstrumentation.registerNavigationContainer(ref);
        }
    }, [ref]);

    return <Stack /*onLayout={onLayoutRootView}*/ />; 
}

export default Sentry.wrap(Layout);