import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { getSettingLinkApi } from './homeApiFunctions';
import WebView from 'react-native-webview';

interface ApiResponseInterface {
  success: boolean;
  message: string;
  data: {
    appSettings: {
      _id: string;
      deviceType: 'android' | 'ios' | 'web';
      version: string;
      frontEndUrl: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

const Home = () => {
  const [result, setResult] = useState<ApiResponseInterface | null>(null);
  const [apiLoader, setApiLoader] = useState<boolean>(true);
  const [webViewVisible, setWebViewVisible] = useState<boolean>(false);

  useEffect(() => {
    handleUrl();
    // Linking.getInitialURL().then(url => {
    //   if (url) {
    //     if (url?.includes('kharidi360.com')) {
    //       handleUrl();
    //     }
    //   } else {
    //     setApiLoader(false);
    //   }
    // });

    // const subscription = Linking.addEventListener('url', e => {
    //   // Handle the URL
    //   if (e?.url?.includes('kharidi360.com')) {
    //     handleUrl();
    //   } else {
    //     setApiLoader(false);
    //   }
    // });

    // return () => {
    //   subscription.remove();
    // };
  }, []);

  const handleUrl = async () => {
    try {
      setApiLoader(true);
      const response = await getSettingLinkApi();
      if (response && response?.success) {
        setResult(response);
        setWebViewVisible(true);
      } else {
        setResult(null);
        setWebViewVisible(false);
        console.log('API call failed or returned unsuccessful status');
      }
    } catch (error) {
      setResult(null);
      setWebViewVisible(false);
      console.log('Error handling URL:', error);
    } finally {
      setApiLoader(false);
    }
  };

  // Show loader while API is being called
  if (apiLoader) {
    return (
      <View style={styles.root}>
        <ActivityIndicator size={'large'} color={'orange'} />
      </View>
    );
  }

  // Show WebView if we have a valid URL from API
  if (webViewVisible && result?.data?.appSettings?.frontEndUrl) {
    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: result?.data?.appSettings?.frontEndUrl }}
          style={styles.container}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.root}>
              <ActivityIndicator size={'large'} color={'orange'} />
            </View>
          )}
          onError={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            Alert.alert('Something went wrong while loading the page.');
            console.log('WebView error: ', nativeEvent);
          }}
          onHttpError={syntheticEvent => {
            const { nativeEvent } = syntheticEvent;
            Alert.alert('Something went wrong while loading the page.');
            console.log('WebView HTTP error: ', nativeEvent);
          }}
        />
      </View>
    );
  }

  // Default home screen when no deep link is detected
  return (
    <View style={styles.root}>
      <Text>Welcome to Khardi 360</Text>
    </View>
  );
};

export default memo(Home);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
