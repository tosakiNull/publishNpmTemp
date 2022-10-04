/*** example/src/app.js ***/
/** Before React 18 */
// import React from 'react'
// import { render } from 'react-dom'
// import ReactDemo from '../../src'

// const App = () => <ReactDemo />
// render(<App />, document.getElementById('root'))


/** React 18 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDemo from '../../src';

const root = createRoot(document.getElementById('root'));
const App = () => <ReactDemo />;

root.render(<App />);
