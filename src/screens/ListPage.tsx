import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB6C1',
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
  botao: {
    margin: 10,
  },
 
});

type ListItemProps = {
  pet: {
    name: string;
  };
};

const ListItem = ({pet}: ListItemProps) => {
  return (
    <View>
      <Text>{pet.name}</Text>
    </View>
  );
};


const ListPage = ({navigation}: any) => {
  const [pets, setPets] = useState();


  const getPetData = useCallback(async () => {
    try {
      const {data} = await axios.get(
        'https://tamagochiapi-clpsampedro.b4a.run/pets',
      );
      setPets(data);
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
      color={"#C71585"}
      />

      <Button
          onPress={() => {
            navigation.navigate('Atualiza');
          }}
          title="Atualizar"
          color={"#C71585"}
        />
        <Button
          onPress={() => {
            navigation.navigate('Deleta');
          }}
          title="Deletar"
          color={"#C71585"}
        />
        <FlatList
          data={pets}
          renderItem={({item}) => <ListItem pet={item} />}
        />
    </SafeAreaView>
  );
};

export default ListPage;
