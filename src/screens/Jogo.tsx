import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import useAuthStore from '../components/AcessoToken';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB6C1',
  },
  botao: {
    margin: 10,
    padding: 10,
    backgroundColor: '#C71585',
    borderRadius: 5,
  },
  textoBotao: {
    color: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultadoContainer: {
    marginTop: 20,
  },
  resultadoTexto: {
    fontSize: 18,
  },
});

const Jogo = ({ route }: any) => {
  const { id } = route.params;
  const { token } = useAuthStore();
  const [resultado, setResultado] = useState<string | null>(null);
  const [escolha, setEscolha] = useState<string | null>(null);

  const aumentarVida = async () => {
    try {
      await axios.post(`https://tamagochiapi-clpsampedro.b4a.run/pet/${id}/play`, {}, {
        headers: {
          'x-access-token': token,
        },
      });
    } catch (error) {
      Alert.alert('Erro', `${error}`, [
        { text: 'Ok', onPress: () => console.log('Ok') },
      ]);
    }
  };

  const jogarPedraPapelTesoura = async () => {
    const opcoes = ['Pedra', 'Papel', 'Tesoura'];
    const numeroAleatorio = Math.floor(Math.random() * 3);
    const escolhaPet = opcoes[numeroAleatorio];
    setResultado(escolhaPet);

    if (escolha === escolhaPet) {
      Alert.alert('Empate', 'Empate, tente novamente!', [
        { text: 'OK', onPress: () => console.log('Ok') },
      ]);
    } else if (
      (escolha === 'Pedra' && escolhaPet === 'Tesoura') ||
      (escolha === 'Papel' && escolhaPet === 'Pedra') ||
      (escolha === 'Tesoura' && escolhaPet === 'Papel')
    ) {
      Alert.alert('Parabéns', `Parabéns, ${escolha} venceu!`, [
        { text: 'OK', onPress: () => console.log('Ok') },
      ]);
    } else {
      Alert.alert('Derrota', `Que pena, ${escolha} perdeu!`, [
        { text: 'OK', onPress: () => console.log('Ok') },
      ]);
    }
    await aumentarVida();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pedra, Papel ou Tesoura</Text>

      <TouchableOpacity onPress={() => setEscolha('Pedra')} style={styles.botao}>
        <Text style={styles.textoBotao}>Escolher Pedra</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setEscolha('Papel')} style={styles.botao}>
        <Text style={styles.textoBotao}>Escolher Papel</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setEscolha('Tesoura')} style={styles.botao}>
        <Text style={styles.textoBotao}>Escolher Tesoura</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={jogarPedraPapelTesoura} style={styles.botao}>
        <Text style={styles.textoBotao}>Jogar</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoTexto}>Escolha do Pet: {resultado}</Text>
        </View>
      )}
      <View style={styles.resultadoContainer}>
        <Text style={styles.resultadoTexto}>Sua Escolha: {escolha}</Text>
      </View>
    </View>
  );
};

export default Jogo;
