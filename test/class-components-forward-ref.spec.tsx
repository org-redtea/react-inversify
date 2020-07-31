import 'reflect-metadata';
import React, {Ref} from 'react';
import {expect} from 'chai';
import {
    injectAllNamedServices,
    injectAllServices,
    injectAllTaggedServices,
    injectContainer,
    injectNamedService,
    injectService,
    injectTaggedService,
    resolve
} from '../src';
import {renderToString} from 'react-dom/server';
import {Container} from 'inversify';
import {buildContainer} from './fixtures/container';
import {withContext} from './helpers/withContext';
import {
    InjectAllNamedServicesForwardRef,
    InjectAllServicesForwardRef,
    InjectContainerForwardRef,
    InjectNamedServiceForwardRef,
    InjectServiceForwardRef,
    ResolveForwardRef
} from './fixtures/class-components-forward-ref';


describe('class component: forward ref', () => {
    let container: Container;

    before(() => {
        container = buildContainer();
    });

    it('injectContainer', () => {
        const ref = React.createRef();
        const root = withContext(InjectContainerForwardRef, container, {
            ref,
            onRef: (_: Ref<any>) => expect(_).to.be.eq(ref)
        });
        renderToString(root);
    });

    it('injectService', () => {
        const ref = React.createRef();
        const root = withContext(InjectServiceForwardRef, container, {
            ref,
            onRef: (_: Ref<any>) => expect(_).to.be.eq(ref)
        });
        renderToString(root);
    });

    it('injectAllServices', () => {
        const ref = React.createRef();
        const root = withContext(InjectAllServicesForwardRef, container, {
            ref,
            onRef: (_: Ref<any>) => expect(_).to.be.eq(ref)
        });
        renderToString(root);
    });

    it('injectNamedService', () => {
        const ref = React.createRef();
        const root = withContext(InjectNamedServiceForwardRef, container, {
            ref,
            onRef: (_: Ref<any>) => expect(_).to.be.eq(ref)
        });
        renderToString(root);
    });

    it('injectAllNamedServices', () => {
        const ref = React.createRef();
        const root = withContext(InjectAllNamedServicesForwardRef, container, {
            ref,
            onRef: (_: Ref<any>) => expect(_).to.be.eq(ref)
        });
        renderToString(root);
    });

    it('injectTaggedService', () => {
        const ref = React.createRef();
        const root = withContext(InjectNamedServiceForwardRef, container, {
            ref,
            onRef: (_: Ref<any>) => expect(_).to.be.eq(ref)
        });
        renderToString(root);
    });

    it('injectAllTaggedServices', () => {
        const ref = React.createRef();
        const root = withContext(InjectAllNamedServicesForwardRef, container, {
            ref,
            onRef: (_: Ref<any>) => expect(_).to.be.eq(ref)
        });
        renderToString(root);
    });

    it('resolve', () => {
        const ref = React.createRef();
        const root = withContext(ResolveForwardRef, container, {
            ref,
            onRef: (_: Ref<any>) => expect(_).to.be.eq(ref)
        });
        renderToString(root);
    });
});
