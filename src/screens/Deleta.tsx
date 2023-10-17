import React, {useEffect, useState} from 'react';
import {TextInput, SafeAreaView, StyleSheet, Text, Button, View} from 'react-native';
import axios from 'axios';


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


const Deleta = ({navigation}: any) => {
  const [text, setText] = useState<string>();

  const registerData = async () => {
    try {
      const {data} = await axios.delete(
        'https://tamagochiapi-clpsampedro.b4a.run/pet/:id',{
         }
      );
       console.log("Pet atualizado com sucesso");
     } catch (error) {
      console.log("Não foi possível atualizar", error);
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
        />

        <View style={styles.botao}>
            <Button
            onPress={() => {
                registerData();
            }}
            color={"#C71585"}
            title="Deletar"/>
        </View>
      </SafeAreaView>
    );
        }

  export default Deleta;
  