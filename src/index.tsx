import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { queryClient } from 'shared/provider/queryClient';
import App from './app/App';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
