import React, {useEffect, useState} from 'react';
import {TextInput, SafeAreaView, StyleSheet, Text, Button} from 'react-native';
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
 
});


const Cadastro = ({navigation}: any) => {
  const [text, setText] = useState<string>();
  const [password, setPassword] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  const registerData = async () => {
    console.log(text, password);
    try {
      const {data} = await axios.post(
        'https://tamagochiapi-clpsampedro.b4a.run/register',{
          email:text,
          password:password}
      );
       console.log("Login cadastrado com sucesso");
     } catch (error) {
      console.log("Não foi possível cadastrar", error);
    }
  
  };


  useEffect(() => {
   
  }, []);




  const onChangeInput = (value: string) => {
    if (value.length >= 6) {
        setHasError(false);
      } else {
        setHasError(true);
      }
      setText(value);
    };
   
    const onChangePassword = (value: string) => {
      if (value.length >= 6) {
        setPasswordError(false);
      } else {
        setPasswordError(true);
      }
      setPassword(value);
    };
   
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={onChangeInput} placeholder="E-mail"
        />
  
  
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry={true} placeholder="Senha"
        />
  
  
        <Button
          onPress={() => {
            //navigation.navigate('Login');
            registerData();
          }}
          color={"#C71585"}
          title="Login"/>
  
  
      </SafeAreaView>
    );
  };

  export default Cadastro;
  