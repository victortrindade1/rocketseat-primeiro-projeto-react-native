# Salvando no storage

## async-storage

O RN não possui um `Local Storage` como tem no react. Para salvar local no
aparelho sem usar banco de dados, existe uma lib q cria um local storage.

`yarn add @react-native-community/async-storage`

Depois...

`react-native run-android`

## src/pages/Main/index.js

```diff
+ import AsyncStorage from '@react-native-community/async-storage';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

+  async componentDidMount() {
+    const users = await AsyncStorage.getItem('users');
+
+    if (users) {
+      this.setState({ users: JSON.parse(users) });
+    }
+  }
+
+  componentDidUpdate(_, prevState) {
+    const { users } = this.state;
+
+    if (prevState.users !== users) {
+      AsyncStorage.setItem('users', JSON.stringify(users));
+    }
+  }
```
