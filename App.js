import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import moment from 'moment-hijri';

// اسکرینز امپورٹ (نیچے فائلیں بنائیں)
import IntroScreen from './screens/IntroScreen';
import TimetableScreen from './screens/TimetableScreen';
import AdmissionScreen from './screens/AdmissionScreen';
import GuidelinesScreen from './screens/GuidelinesScreen';
import ExamsScreen from './screens/ExamsScreen';
import HolidaysScreen from './screens/HolidaysScreen';
import GraduatesScreen from './screens/GraduatesScreen';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeScreen = ({ navigation }) => {
  const [time, setTime] = useState('');
  const [hijriDate, setHijriDate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('ur-PK'));
      setHijriDate(moment().format('iDD iMMMM iYYYY'));
    }, 1000);

    scheduleDailyNotification();

    return () => clearInterval(timer);
  }, []);

  const scheduleDailyNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "جامعہ عائشہ صدیقہ",
        body: "آج صبح 7:30 بجے جامعہ پہنچیں۔ وقت کی پابندی کریں!",
      },
      trigger: { hour: 7, minute: 30, repeats: true },
    });
  };

  const menu = [
    { title: 'جامعہ کا تعارف', screen: 'Intro' },
    { title: 'ٹائم ٹیبل', screen: 'Timetable' },
    { title: 'داخلے کا طریقہ کار', screen: 'Admission' },
    { title: 'طالبات کے لئے ہدایات', screen: 'Guidelines' },
    { title: 'امتحانات کا شیڈول', screen: 'Exams' },
    { title: 'چھٹیوں کا دورانیہ', screen: 'Holidays' },
    { title: 'تعداد فاضلات', screen: 'Graduates' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>جامعہ عائشہ صدیقہ لبنات</Text>
        <Text style={styles.subtitle}>مچھی پول، مانسہرہ</Text>
        <Text style={styles.watch}>{time}</Text>
        <Text style={styles.hijri}>{hijriDate} ہجری</Text>
      </View>

      {menu.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={styles.card}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ہوم' }} />
        <Stack.Screen name="Intro" component={IntroScreen} options={{ title: 'تعارف' }} />
        <Stack.Screen name="Timetable" component={TimetableScreen} options={{ title: 'ٹائم ٹیبل' }} />
        <Stack.Screen name="Admission" component={AdmissionScreen} options={{ title: 'داخلہ' }} />
        <Stack.Screen name="Guidelines" component={GuidelinesScreen} options={{ title: 'ہدایات' }} />
        <Stack.Screen name="Exams" component={ExamsScreen} options={{ title: 'امتحانات' }} />
        <Stack.Screen name="Holidays" component={HolidaysScreen} options={{ title: 'چھٹیاں' }} />
        <Stack.Screen name="Graduates" component={GraduatesScreen} options={{ title: 'فاضلات' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  header: { backgroundColor: '#2c3e50', padding: 20, alignItems: 'center' },
  title: { fontSize: 24, color: 'white', fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#ecf0f1', fontSize: 16 },
  watch: { fontSize: 32, color: '#3498db', marginTop: 10, fontWeight: 'bold' },
  hijri: { color: '#f1c40f', fontSize: 18 },
  card: { backgroundColor: 'white', margin: 10, padding: 15, borderRadius: 10, elevation: 3 },
  cardText: { fontSize: 18, textAlign: 'center', color: '#2c3e50' },
});

export default App;
