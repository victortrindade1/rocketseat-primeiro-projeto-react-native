import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  /**
   * P/ conexão USB:
   */
  const tron = Reactotron.configure().useReactNative().connect();

  /**
   * P/ emulador do android studio:
   * OBS: o host local do pc pode mudar. Verifique com >>> hostname -I
   */
  // const tron = Reactotron.configure({ host: '192.168.1.4' })
  //   .useReactNative()
  //   .connect();

  console.tron = tron;

  tron.clear(); // Opcional. Limpa a tela do Reactotron a cada refresh
}
