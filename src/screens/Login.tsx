import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Text, Button, View, Image } from 'react-native';
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

const Login = ({ navigation }: any) => {
  const [logins, setLogins] = useState();
  const [text, setText] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { token, setToken } = useAuthStore();

  const getLoginData = async () => {
    console.log(text, password);
    try {
      const { data } = await axios.post(
        'https://tamagochiapi-clpsampedro.b4a.run/login',
        {
          email: text,
          password: password,
        }
      );
      setToken(data.token);
      console.log('Login efetuado com sucesso');
    } catch (error) {
      console.log('Não foi possível logar', error);
    }
  };

  useEffect(() => {
    // getLoginData();
  }, []);

  const isButtonDisabled = () => {
    return !text || !password || text.length < 6 || password.length < 6;
  };

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
      <Image source={require('../../Imagem/tamagochi.gif')}/>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={onChangeInput}
        placeholder="E-mail"
      />
      {hasError ? <Text>Digite seu login</Text> : null}

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry={true}
        placeholder="Senha"
      />
      {passwordError ? <Text>Digite sua senha</Text> : null}

      <View style={styles.botao}>
        <Button
          onPress={() => {
            navigation.navigate('Cadastro');
          }}
          title="Cadastrar"
          color="#C71585"
        />
      </View>

      <Button
        onPress={() => {
          getLoginData();
          navigation.navigate('Listagem');
        }}
        title="Logar"
        disabled={isButtonDisabled()}
        color="#C71585"
      />
    </SafeAreaView>
  );
};
export default Login;
