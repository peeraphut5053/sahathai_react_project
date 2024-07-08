import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

ReactDOM.render((
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
     />
    <App />
    </QueryClientProvider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
