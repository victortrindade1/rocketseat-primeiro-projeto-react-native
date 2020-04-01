# Estilizando formulário

## RN Vector Icons

Assim como no React existe o React Icons, no RN tem tb.

`yarn add react-native-vector-icons`

### ios/primeiro_projeto_react_native/Info.plist

> Aqui é para App de iOS

Veja a documentação do React Native Vector Icons.

```diff

...

	<array>
		<string>UIInterfaceOrientationPortrait</string>
		<string>UIInterfaceOrientationLandscapeLeft</string>
		<string>UIInterfaceOrientationLandscapeRight</string>
	</array>
	<key>UIViewControllerBasedStatusBarAppearance</key>
	<false/>
+   <key>UIAppFonts</key>
+   <array>
+     <string>MaterialIcons.ttf</string>
+   </array>
</dict>
</plist>
```

OBS: Aqui tinha umas 10 fontes. Tirei todas e deixei só Material Icons, para não
pesar o bundle.

Acesse a pasta iOS e rode `pod install`.

### android/app/build.gradle

> Aqui é para App Android

Lá embaixo, cole:

```javascript
project.ext.vectoricons = [
    iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

Após, `react-native run-android`.

## Gesture Handler

Qnd a lib react-navigation foi instalada, veio junto essa Gesture Handler. Esta
lib tem por objetivo trazer as animações nativas do aparelho pros componentes do
app. Um deles é o button (veja abaixo). É legal fazer os botões por essa lib
pois fica cheio de animações nativas. Pra acrescentar um botão desta lib:

src/components/Foobar/index.js:

```javascript
import React from 'react';

import { MyButton } from './styles';

export default function Foobar() {
  return <MyButton>Teta</MyButton>;
}
```

src/components/Foobar/styles.js:

```javascript
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const MyButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
`;
```

> Repare que RectButton veio como argumento de styled(). Isto porque o styled
> components permite estilizar elementos de outras libs.

## src/pages/Main/index.js

```diff
import React from 'react';
- import { Text } from 'react-native';
+ import Icon from 'react-native-vector-icons/MaterialIcons';

+ import { Container, Form, Input, SubmitButton } from './styles';

- import { Container } from './styles';
+ import { Container, Form, Input, SubmitButton } from './styles';

export default function Main() {
  return (
    <Container>
-      <Text>Home Screen</Text>
+       <Form>
+         <Input
+           autoCorrect={false}
+           autoCapitalize="none"
+           placeholder="Adicionar usuário"
+         />
+         <SubmitButton>
+           <Icon name="add" size={20} color="#fff" />
+         </SubmitButton>
+       </Form>
    </Container>
  );
}
```

## src/pages/Main/styles.js

```diff
import styled from 'styled-components/native';
+ import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
-  background-color: #aaa;
-  align-items: center;
-  justify-content: center;
+  background-color: #fff;
`;

+ export const Form = styled.View`
+   flex-direction: row;
+   padding-bottom: 20px;
+   border-bottom-width: 1px;
+   border-color: #eee;
+ `;
+
+ export const Input = styled.TextInput.attrs({
+   // A cor do placeholder eu preciso estilizar como atributo pois
+   // placeholderTextColor é atributo de TextInput
+   placeholderTextColor: '#999',
+ })`
+   flex: 1;
+   height: 40px;
+   background: #eee;
+   border-radius: 4px;
+   padding: 0 15px;
+   border: 1px solid #eee;
+ `;
+
+ export const SubmitButton = styled(RectButton)`
+   justify-content: center;
+   align-items: center;
+   background: #7159c1;
+   border-radius: 4px;
+   margin-left: 10px;
+   padding: 0 12px;
+ `;
```
