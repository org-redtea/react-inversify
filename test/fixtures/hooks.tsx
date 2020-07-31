import React, {FC} from 'react';
import {Container} from 'inversify';
import {
    useAllNamedService,
    useAllServices,
    useAllTaggedService,
    useContainer,
    useNamedService,
    useResolve,
    useService,
    useTaggedService
} from '../../src';
import {Tokens} from './tokens';
import {Service} from './service';

export const UseContainer: FC<any> = (props: { onContainer: (c: Container) => void }) => {
    const container = useContainer();
    props.onContainer(container);
    return null;
}

export const UseService: FC<{}> = (props: {}) => {
    const service = useService<string>(Tokens.service);
    return <span>{service}</span>;
}

export const UseAllServices: FC<{}> = (props: {}) => {
    const services = useAllServices<string>(Tokens.services);
    return <span>{services.join(',')}</span>;
}

export const UseNamedService: FC<{}> = (props: {}) => {
    const service = useNamedService<string>(Tokens.namedService, 'service');
    return <span>{service}</span>;
}

export const UseAllNamedServices: FC<{}> = (props: {}) => {
    const services = useAllNamedService<string>(Tokens.namedServices, 'services');
    return <span>{services.join(',')}</span>;
}
export const UseTaggedService: FC<{}> = (props: {}) => {
    const service = useTaggedService<string>(Tokens.taggedService, 'service', '0');
    return <span>{service}</span>;
}

export const UseAllTaggedServices: FC<{}> = (props: {}) => {
    const services = useAllTaggedService<string>(Tokens.taggedServices, 'services', '0');
    return <span>{services.join(',')}</span>;
}

export const UseResolve: FC<{ onService(service: any): void }> = (props: { onService(service: any): void }) => {
    const service = useResolve<{ value: string }>(Service);
    const [flag, setFlag] = React.useState(false);
    if (!flag) {
        setFlag(true);
    }
    props.onService(service);
    return null;
}
