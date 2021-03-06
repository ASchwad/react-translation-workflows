import React, {useEffect} from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  NativeModules,
} from 'react-native';

import i18n from 'i18next';
import translations from './translations';
import {useTranslation, initReactI18next, withTranslation} from 'react-i18next';
i18n.use(initReactI18next).init({
  resources: translations,
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
});

const App = () => {
  const {t} = useTranslation();
  const [deviceLanguage, setDeviceLanguage] = React.useState('');

  const backgroundStyle = {
    backgroundColor: 'white',
    flex: 1,
  };

  useEffect(() => {
    let locale = 'en';
    if (Platform.OS === 'ios') {
      // from iOS 13: NativeModules.SettingsManager.settings.AppleLanguages[0]
      locale =
        NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0];
    } else {
      locale = NativeModules.I18nManager.localeIdentifier;
    }
    // Reducing the locale to the first 2 letters (e.g. 'en-US' -> 'en')
    setDeviceLanguage(locale);
    locale = locale.substr(0, 2);
    i18n.changeLanguage(locale);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            alignItems: 'center',
            minHeight: '100%',
          }}>
          <Text
            style={{
              fontSize: 24,
              width: '80%',
              textAlign: 'center',
              fontWeight: '300',
              letterSpacing: 3,
              flex: 1,
            }}>
            React Native Translation Showcase
          </Text>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Text style={{fontSize: 40}}>{t('welcome')}</Text>
            <Text style={{fontSize: 60}}>{t('food')}</Text>
            <Text>{'Current language key: ' + i18n.language}</Text>
            <Text>{'Device language key: ' + deviceLanguage}</Text>
          </View>
          <View style={{flex: 2}}>
            <Button
              title="Change to english"
              onPress={() => i18n.changeLanguage('en')}
            />
            <Button
              title="Change to german"
              onPress={() => i18n.changeLanguage('de')}
            />
            <Button
              title="Change to french"
              onPress={() => i18n.changeLanguage('fr')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withTranslation()(App);
