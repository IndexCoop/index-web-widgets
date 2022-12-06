import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './app';

// Find all widget divs (in production there will likely only be a single widget per element)
const WidgetDivs = document.querySelectorAll('.index_web_widget');

// Inject our React App into each
WidgetDivs.forEach((Div) => {
  ReactDOM.render(
    <ChakraProvider>
      <React.StrictMode>
        <App domElement={Div} />
      </React.StrictMode>
    </ChakraProvider>,
    Div
  );
});
