import React, { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import useAuthStore from '../components/AcessoToken';
import axios from 'axios';

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
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  botao: {
    margin: 10,
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

type ListItemProps = {
  pet: {
    name: string;
    life: number;
    funLevel: number;
    id: number;
  };
  onViewDetails: (id: number) => void;
};

const ListPage = ({ navigation }: any) => {
  const [bichinho, setBichinho] = useState({ pets: [] });
  const { token } = useAuthStore();
  const [idPet, setIdPet] = useState<number>(0);
  const [newName, setNewName] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const deletaPet = async (id: number) => {
    try {
      await axios.delete('https://tamagochiapi-clpsampedro.b4a.run/pet/' + id, {
        headers: {
          'x-access-token': token,
        },
      });
      console.log('Registro excluído com sucesso');
      getPetData();
    } catch (error) {
      console.log('Não foi possível excluir', error);
    }
  };

  const showDialog = (id: number) => {
    setIdPet(id);
    setIsModalVisible(true);
  };

  const atualizaPet = async () => {
    try {
      await axios.put(
        'https://tamagochiapi-clpsampedro.b4a.run/pet/' + idPet,
        {
          name: newName,
        },
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      console.log('Registro atualizado');
      setIsModalVisible(false);
      getPetData();
    } catch (error) {
      console.log('Não foi possível atualizar', error);
    }
  };

  const viewDetails = (id: number) => {
    navigation.navigate('Detalhes', { id });
  };

  const ListItem = ({ pet, onViewDetails }: ListItemProps) => {
    return (
      <SafeAreaView>
        <View style={styles.card}>
          <View>
            <Image source={require('../../Imagem/pet.png')} style={{ width: 50, height: 50 }} />
            <Text style={styles.input}>Nome: {pet.name}</Text>
            <Text style={styles.input}>Vida: {pet.life}</Text>
            <Text style={styles.input}>Diversão: {pet.funLevel}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.botao}>
              <Button onPress={() => deletaPet(pet.id)} title="Deletar" color="#C71585" />
              <Button onPress={() => showDialog(pet.id)} title="Atualizar" color="#C71585" />
            </View>
            <Button onPress={() => onViewDetails(pet.id)} title="Detalhes" color="#C71585" />
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={() => navigation.navigate('CadastroPet')} title="Cadastrar" color="#C71585" />
      <FlatList
        data={bichinho.pets}
        renderItem={({ item }) => <ListItem pet={item} onViewDetails={viewDetails} />}
      />

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.input}>Novo Nome:</Text>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={(text) => setNewName(text)}
            />
            <Button onPress={atualizaPet} title="Atualizar" color="#C71585" />
            <Button onPress={() => setIsModalVisible(false)} title="Cancelar" color="#C71585" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ListPage;
