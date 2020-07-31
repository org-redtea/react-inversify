import 'reflect-metadata';
import React from 'react';
import {expect} from 'chai';
import {
    useAllNamedService,
    useAllServices,
    useAllTaggedService,
    useContainer,
    useNamedService,
    useResolve,
    useService,
    useTaggedService
} from '../src';
import {renderToString} from 'react-dom/server';
import {Container} from 'inversify';
import {buildContainer} from './fixtures/container';
import {withContext} from './helpers/withContext';
import {
    UseAllNamedServices,
    UseAllServices,
    UseAllTaggedServices,
    UseContainer,
    UseNamedService,
    UseResolve,
    UseService,
    UseTaggedService
} from './fixtures/hooks';


describe('hooks', () => {
    let container: Container;

    before(() => {
        container = buildContainer();
    });

    it('useContainer', () => {
        const root = withContext(UseContainer, container, {
            onContainer: (c: Container) => expect(c).to.be.eq(container)
        });
        renderToString(root);
    });

    it('useService', () => {
        const root = withContext(UseService, container);
        expect(renderToString(root)).to.be.eq('<span>service</span>');
    });

    it('useAllServices', () => {
        const root = withContext(UseAllServices, container);
        expect(renderToString(root)).to.be.eq('<span>1,2</span>');
    });

    it('useNamedService', () => {
        const root = withContext(UseNamedService, container);
        expect(renderToString(root)).to.be.eq('<span>service</span>');
    });

    it('useAllNamedService', () => {
        const root = withContext(UseAllNamedServices, container);
        expect(renderToString(root)).to.be.eq('<span>1,2</span>');
    });

    it('useTaggedService', () => {
        const root = withContext(UseTaggedService, container);
        expect(renderToString(root)).to.be.eq('<span>service</span>');
    });

    it('useAllTaggedService', () => {
        const root = withContext(UseAllTaggedServices, container);
        expect(renderToString(root)).to.be.eq('<span>1,2</span>');
    });

    it('useResolve', () => {
        const services: any[] = [];
        const root = withContext(UseResolve, container, {
            onService(service: any) {
                services.push(service);
            }
        });
        renderToString(root);
        expect(services[0]).to.be.eq(services[1]);
    });
});

