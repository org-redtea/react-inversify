import {Container} from 'inversify';
import React from 'react';

export const Context = React.createContext<Container>(undefined as unknown as Container);

Context.displayName = 'InversifyContainerContext';
