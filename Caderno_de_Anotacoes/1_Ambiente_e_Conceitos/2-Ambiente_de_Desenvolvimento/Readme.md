# Ambiente de Desenvolvimento

Existe uma documentação pronta da Rocketseat online com o passo-a-passo pra
configurar o Linux pra usar o React Native.
Acesse: `https://react-native.rocketseat.dev/`

Umas observações:

- Na hora de configurar as variáveis de ambiente, no meu pc não deu certo em
  `.bashrc`. Deu em `.profile`.
- Depois de salvar as variáveis de ambiente, vc deve reiniciar o terminal para
  funcionar.
- Teste as variáveis de ambiente antes de emular. Para testar, insira no
  terminal:

```
echo $HOME
echo $PATH
echo $JAVA_HOME
echo $ANDROID_HOME
```

> Se estiver no MAC, instale tb o `cocoapods`. Ele é um gerenciador de pacotes.
