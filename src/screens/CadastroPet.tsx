import React, { useEffect, useState } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Text, Button, View } from 'react-native';
import axios from 'axios';
import useAuthStore from '../components/AcessoToken';

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

const CadastroPet = ({ navigation }: any) => {
  const [text, setText] = useState<string>();
  const { token } = useAuthStore();

  const registerData = async () => {
    console.log(text);
    console.log(token);
    try {
      const { data } = await axios.post(
        'https://tamagochiapi-clpsampedro.b4a.run/pet',
        {
          name: text,
        },
        {
          headers: {
            'x-access-token': token,
          },
        }
      );
      console.log("Pet cadastrado com sucesso");
    } catch (error) {
      console.log("Não foi possível cadastrar", error);
    }
  };

  useEffect(() => {
  
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        placeholder="Pet"
        onChangeText={setText}
      />
      <View style={styles.botao}>
        <Button
          onPress={() => {
            registerData();
          }}
          color="#C71585"
          title="Registrar"
        />
      </View>
    </SafeAreaView>
  );
};

export default CadastroPet;
