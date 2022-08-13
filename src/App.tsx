import React, { FC } from 'react';
import { ButtonGroup } from './components/ButtonGroup';
import Content from './components/Content';
import Navbar from './components/Navbar';
import { AdapterContext } from './contexts/AdapterContext';

export const App: FC = () => {
    return (
        <AdapterContext>
            <Navbar />
            <Content />
        </AdapterContext>
    );
};


