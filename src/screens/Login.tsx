import React, {useState} from 'react';
import {TextInput, SafeAreaView, StyleSheet, Text, Button} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#00FA9A',
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

const Login = ({navigation}: any) => {
  const [text, setText] = useState<string>();
  const [password, setPassword] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={onChangeInput}
      />

      {hasError ? <Text>Digite seu login</Text> : null}

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry={true}
      />
      {passwordError ? <Text>Digite sua senha</Text> : null}

      <Button
        onPress={() => {
          navigation.navigate('Acesso');
        }}
        title="Logar"
        disabled={isButtonDisabled()}
      />

    </SafeAreaView>
  );
};
export default Login;
