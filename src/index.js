import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider } from "react-redux";
import store from "./redux/store";

const debug = process.env.NODE_ENV === "" ? void 0 : new DebugEngine();

const engine = new Styletron();

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <App />
    </StyletronProvider>
  </Provider>
);
