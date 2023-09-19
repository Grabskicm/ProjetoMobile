import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, StatusBar, Text} from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFB6C1',
    },
   
  });


const Acessado = [


///https://tamagochiapi-clpsampedro.b4a.run
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
