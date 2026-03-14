import { Stack } from 'expo-router';
import 'expo-dev-client';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://4776fde8644175c12b2abd1192c53044@o4506961485955072.ingest.us.sentry.io/4506961487724544',
  debug: __DEV__,
});

const Layout = () => {
  return <Stack />;
};

export default Sentry.wrap(Layout);
