import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ShoppingApp from './shopping/ShoppingApp';

ReactDOM.render(
  <StrictMode>
    <ShoppingApp />
  </StrictMode>,
  document.getElementById('root')
);