

import React from 'react';
import * as ReactDOMClient from 'react-dom/client'; 
import './Styles/reset.css'
import './styles.scss';
import Main from './main';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(<Main />); 
