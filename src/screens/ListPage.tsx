import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import {

  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CardInfo from '../components/CardInfo';
import useAuthStore from '../components/AcessoToken';

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
});

type ListItemProps = {
  pet: {
    name: string;
    life: number;
    funLevel: number;
    id: number;
  };
};

const ListItem = ({ pet }: ListItemProps) => {
  return (
    <SafeAreaView>
      <View style={styles.card}>
        <View>
          <Text style={styles.input}>Nome: {pet.name}</Text>
          <Text style={styles.input}>Vida: {pet.life}</Text>
          <Text style={styles.input}>Diversão: {pet.funLevel}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.botao}>
          <Button
            onPress={() => {
              
            }}
            title="Atualizar"
            color="#C71585"
          />
          <Button
            onPress={() => {
              
            }}
            title="Deletar"
            color="#C71585"
          />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const ListPage = ({ navigation }: any) => {
  const [bichinho, setBichinho] = useState({ pets: [] });
  const { token } = useAuthStore();

  const getPetData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        'https://tamagochiapi-clpsampedro.b4a.run/pets',
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      setBichinho(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getPetData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Button
        onPress={() => {
          navigation.navigate('CadastroPet');
        }}
        title="Cadastrar"
        color="#C71585"
      />
      <FlatList
        data={bichinho.pets}
        renderItem={({ item }) => <ListItem pet={item} />}
      />
    </SafeAreaView>
  );
};

export default ListPage;
