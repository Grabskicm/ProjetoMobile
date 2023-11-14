import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import axios from "axios";
import useAuthStore from "../components/AcessoToken";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB6C1',
  },
  card: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  botao: {
    margin: 30,
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: '80%',
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#fff',
    width: '80%',
  },
});

// ... (restante do código)

const Detalhes = ({ route, navigation }: any) => {
    const { id } = route.params;
    const { token } = useAuthStore();
    const [tamagotchi, setTamagotchi] = useState<any>();
  
    const getDetalhesBichinho = async () => {
      console.log(id);
      try {
        const { data } = await axios.get(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}`, {
          headers: {
            'x-access-token': token,
          },
        });
        setTamagotchi(data);
        console.log(tamagotchi);
      } catch (error) {
        Alert.alert('Erro', `${error}`, [{ text: 'Ok', onPress: () => console.log('Ok') }]);
      }
    };
  
    useEffect(() => {
      getDetalhesBichinho();
    }, [navigation]);
  
    const alimentar = async () => {
      try {
        await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}/food`, {}, {
          headers: {
            'x-access-token': token,
          },
        });
  
        getDetalhesBichinho();
      } catch (error) {
        Alert.alert('Erro', `${error}`, [{ text: 'Ok', onPress: () => console.log('Ok') }]);
      }
    };
  
    const descansar = async () => {
      try {
        await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}/rest`, {}, {
          headers: {
            'x-access-token': token,
          },
        });
        getDetalhesBichinho();
      } catch (error) {
        Alert.alert('Erro', `${error}`, [{ text: 'Ok', onPress: () => console.log('Ok') }]);
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View>
            <Text style={styles.input}>Nome: {tamagotchi?.name}</Text>
            <Text style={styles.input}>Vida: {tamagotchi?.life}</Text>
            <Text style={styles.input}>Nivel de descanso: {tamagotchi?.restLevel}</Text>
            <Text style={styles.input}>Diversão: {tamagotchi?.funLevel}</Text>
  
            <View style={styles.botao}>
                <Button
                color="#C71585"
                title="Brincar"
                onPress={() => navigation.navigate('Jogo', { id })}
                />
    
                <Button
                color="#C71585"
                title="Dormir"
                onPress={() => descansar()}
                />
    
                <Button
                color="#C71585"
                title="Comer"
                onPress={() => alimentar()}
                />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default Detalhes;
  


