import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import App from './app';

// Find all widget targets (in production there will likely only be a single widget per element)
const WidgetTargets = document.querySelectorAll('.index_web_widget');

// Inject our React App into each widget
WidgetTargets.forEach((widgetElement) => {
  const root = createRoot(widgetElement!);
  root.render(
    <ChakraProvider resetCSS={false}>
      <React.StrictMode>
        <App domElement={widgetElement} />
      </React.StrictMode>
    </ChakraProvider>
  );
});
