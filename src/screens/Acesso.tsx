import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, StatusBar, Text} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#00FA9A',
    },
    
  });

const Acessado = [

    
];

const Acesso = ({route}: any) => {
  const {params} = route;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar />
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Acesso;
