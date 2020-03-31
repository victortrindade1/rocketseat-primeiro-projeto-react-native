# Configurando Status Bar

O Status Bar é aquela barra do telefone informando bateria, sinal, etc.
O Status Bar é nativo do RN.

## src/index.js

```diff
import 'react-native-gesture-handler';
import React from 'react';
+ import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Routes from './routes';

export default function App() {
-  return <Routes />;
+  return (
+    <>
+      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
+      <Routes />
+    </>
+  );
}
```
