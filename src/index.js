import React from "react";
import ReactDOM from "react-dom";


import { HashRouter } from "react-router-dom";

import App from "./App";
import { customLocalStorageManager } from "./utils/customLocalStorageManager";
import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} colorModeManager={customLocalStorageManager}>
      <HashRouter>
        <App />
      </HashRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
