// src/screens/SplashScreen.tsx
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {nasdaq_logo} from '../../assets';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Splash: undefined;
  Explore: undefined;
};
const SplashScreen = () => {
  const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('Explore');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <View style={styles.container}>
      <Image source={nasdaq_logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.developerName}>Developed by Hazem Radwan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
  },
  developerName: {
    position: 'absolute',
    bottom: 30,
    fontSize: 16,
    color: '#AAAAAA',
  },
});

export default SplashScreen;
