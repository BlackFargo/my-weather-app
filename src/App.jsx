import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import './Styles/reset.css'
import './Styles/styles.scss'
import 'react-loading-skeleton/dist/skeleton.css'

import Main from './Main'

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(<Main />)
