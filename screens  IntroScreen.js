import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

const IntroScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.h1}>جامعہ کا تعارف</Text>
    <Text style={styles.p}>
      جامعہ عائشہ صدیقہ لبنات الاسلامیہ مچھی پول، مانسہرہ ایک ممتاز اسلامی تعلیمی ادارہ ہے جو لڑکیوں کی دینی تعلیم پر توجہ مرکوز کرتا ہے۔ مہتمم: حافظ مفتی محمد شعیب خان آلائی دامت برکاتہم۔{'\n\n'}
      خدمات: قرآن، حدیث، فقہ، عربی۔{'\n\n'}
      خصوصیات: مفت تعلیم، ماہر اساتذہ، لائبریری۔{'\n\n'}
      الحاق: وفاق المدارس العربیہ پاکستان۔
    </Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 15 },
  h1: { fontSize: 22, fontWeight: 'bold', margin: 15, color: '#2c3e50', textAlign: 'center' },
  p: { fontSize: 16, lineHeight: 24, textAlign: 'right' },
});

export default IntroScreen;
