import React, {ElementType} from 'react';
import {Container} from 'inversify';
import {Context} from '../../src';

export function withContext(
    Component: ElementType,
    container: Container,
    props?: any,
) {
    return <Context.Provider value={container}><Component {...props}/></Context.Provider>;
}
