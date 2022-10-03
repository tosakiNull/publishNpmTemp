/*** examples/src/app.js ***/
import React from 'react';
import { render } from 'react-dom';
import ReactDemo from '../../src';
import UserBasicInput from '../../src/UserBasicInput';

const App = () => (
    <>
        <ReactDemo />
        <UserBasicInput />
    </>
);
render(<App />, document.getElementById('root'))
