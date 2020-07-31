import 'reflect-metadata';
import React from 'react';
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
    All,
    InjectAllNamedServices,
    InjectAllServices,
    InjectAllTaggedServices,
    InjectContainer,
    InjectNamedService,
    InjectService,
    InjectTaggedService,
    Resolve
} from './fixtures/class-components';


describe('class component', () => {
    let container: Container;

    before(() => {
        container = buildContainer();
    });

    it('injectContainer', () => {
        const root = withContext(InjectContainer, container, {
            cb: (c: Container) => expect(c).to.be.eq(container)
        });
        renderToString(root);
    });

    it('injectService', () => {
        const root = withContext(InjectService, container);
        expect(renderToString(root)).to.be.eq('<span>service</span>');
    });

    it('injectAllServices', () => {
        const root = withContext(InjectAllServices, container);
        expect(renderToString(root)).to.be.eq('<span>1,2</span>');
    });

    it('injectNamedService', () => {
        const root = withContext(InjectNamedService, container);
        expect(renderToString(root)).to.be.eq('<span>service</span>');
    });

    it('injectAllNamedServices', () => {
        const root = withContext(InjectAllNamedServices, container);
        expect(renderToString(root)).to.be.eq('<span>1,2</span>');
    });

    it('injectTaggedService', () => {
        const root = withContext(InjectTaggedService, container);
        expect(renderToString(root)).to.be.eq('<span>service</span>');
    });

    it('injectAllTaggedServices', () => {
        const root = withContext(InjectAllTaggedServices, container);
        expect(renderToString(root)).to.be.eq('<span>1,2</span>');
    });

    it('resolve', () => {
        const root = withContext(Resolve, container);
        expect(renderToString(root)).to.be.eq('<span>service</span>');
    });

    it('apply all decorators', () => {
        const root = withContext(All, container, {
            onProps(props: any) {
                expect(props.service).to.be.not.empty;
                expect(props.services).to.be.not.empty;
                expect(props.namedService).to.be.not.empty;
                expect(props.namedServices).to.be.not.empty;
                expect(props.taggedService).to.be.not.empty;
                expect(props.taggedService).to.be.not.empty;
                expect(props.resolved).to.be.not.empty;
            }
        });
        renderToString(root);
    });
});
