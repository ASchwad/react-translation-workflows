import React from 'react';
import type {Node} from 'react';
import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';

import i18n from 'i18next';
import {useTranslation, initReactI18next, withTranslation} from 'react-i18next';
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: 'Welcome!',
        food: '🍔',
      },
    },
    de: {
      translation: {
        welcome: 'Willkommen!',
        food: '🥨',
      },
    },
    fr: {
      translation: {
        welcome: 'Bienvenue!',
        food: '🥖',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
});

const App: () => Node = () => {
  const {t} = useTranslation();

  const backgroundStyle = {
    backgroundColor: 'white',
    flex: 1,
  };

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
