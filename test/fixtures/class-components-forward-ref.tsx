import {
    injectAllNamedServices,
    injectAllServices,
    injectAllTaggedServices,
    injectContainer,
    injectNamedService,
    injectService,
    injectTaggedService,
    resolve
} from '../../src';
import React from 'react';
import {Service} from './service';
import {Tokens} from './tokens';

export const RefComponent = React.forwardRef((props: any, ref: any) => {
    props.onRef(ref);
    return null;
});

export const InjectContainerForwardRef = injectContainer(
    'container',
    {forwardRef: true}
)(RefComponent);

export const InjectServiceForwardRef = injectService(
    'service',
    Tokens.service,
    {forwardRef: true}
)(RefComponent);

export const InjectAllServicesForwardRef = injectAllServices(
    'services',
    Tokens.services,
    {forwardRef: true}
)(RefComponent);

export const InjectNamedServiceForwardRef = injectNamedService(
    'service',
    Tokens.namedService,
    'service',
    {forwardRef: true}
)(RefComponent);

export const InjectAllNamedServicesForwardRef = injectAllNamedServices(
    'services',
    Tokens.services,
    'services',
    {forwardRef: true}
)(RefComponent);

export const InjectTaggedServiceForwardRef = injectTaggedService(
    'service',
    Tokens.taggedService,
    'service',
    '0',
    {forwardRef: true}
)(RefComponent);

export const InjectAllTaggedServicesForwardRef = injectAllTaggedServices(
    'services',
    Tokens.services,
    'services',
    '0',
    {forwardRef: true}
)(RefComponent);

export const ResolveForwardRef = resolve<{ value: string }>(
    'service',
    Service,
    {forwardRef: true}
)(RefComponent);

