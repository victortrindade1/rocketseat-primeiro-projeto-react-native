# Loading e disabled

Durante a request na API, vai deixar um loading girando dentro do botão +.

Com o `ActivityIndicator` do RN, vc tem acesso aos loadings nativos dos OSs.

## src/pages/Main/index.js

```diff
- import { Keyboard } from 'react-native';
+ import { Keyboard, ActivityIndicator } from 'react-native';

...

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
+    loading: false,
  };

  handleAddUser = async () => {
    const { users, newUser } = this.state;

+    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
+      loading: false,
    });

    Keyboard.dismiss(); // Para o teclado sumir depois do submit
  };

  render() {
-    const { users, newUser } = this.state;
+    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={(text) => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
-          <SubmitButton onPress={this.handleAddUser}>
+          <SubmitButton loading={loading} onPress={this.handleAddUser}>
+            {loading ? (
+              <ActivityIndicator color="#fff" />
+            ) : (
              <Icon name="add" size={20} color="#fff" />
+            )}
          </SubmitButton>
        </Form>

...
```

## src/pages/Main/styles.js

```diff
export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
+  opacity: ${props => props.loading ? 0.7 : 1};
`;
```
