import React, {forwardRef, useMemo} from 'react';
import {interfaces} from 'inversify';
import {
    useAllNamedService,
    useAllServices,
    useAllTaggedService,
    useContainer,
    useNamedService,
    useResolve,
    useService,
    useTaggedService
} from './hooks';
import {getDisplayName} from './utils';

type ReactComponent<P = any> =
    | React.ClassicComponentClass<P>
    | React.ComponentClass<P>
    | React.FunctionComponent<P>
    | React.ForwardRefExoticComponent<P>;

export type Options = {
    forwardRef?: boolean;
};

function createDisplayName(Target: ReactComponent): string {
    return 'InjectedComponent(' + getDisplayName(Target) + ')';
}

function createHOC<C extends ReactComponent>(Target: C, propName: string, value: () => any, options?: Options) {
    const getProps = (props: any) => {
        const extractedValue = value();
        return useMemo(() => ({
            ...props,
            [propName]: extractedValue
        }), [props, extractedValue]);
    }

    if (options && options.forwardRef === true) {
        const forwarded = forwardRef((props: any, ref: any) => {
            const targetProps = getProps(props);
            return <Target ref={ref} {...targetProps}/>;
        }) as unknown as C;
        forwarded.displayName = createDisplayName(Target);
        return forwarded;
    }

    function InjectedComponent(props: any, ref: any) {
        const targetProps = getProps(props);
        return <Target {...targetProps}/>;
    }

    InjectedComponent.displayName = createDisplayName(Target);

    return InjectedComponent as unknown as C;
}


export function injectContainer<S>(
    propName: string,
    options?: Options
) {
    return <C extends ReactComponent>(Target: C) => {
        return createHOC(Target, propName, () => useContainer(), options);
    };
}

export function injectService<S>(
    propName: string,
    id: interfaces.ServiceIdentifier<S>,
    options?: Options
) {
    return <C extends ReactComponent>(Target: C) => {
        return createHOC(Target, propName, () => useService<S>(id), options);
    };
}

export function injectAllServices<S>(
    propName: string,
    id: interfaces.ServiceIdentifier<S>,
    options?: Options
) {
    return <C extends ReactComponent>(Target: C) => {
        return createHOC(Target, propName, () => useAllServices<S>(id), options);
    };
}

export function injectNamedService<S>(
    propName: string,
    id: interfaces.ServiceIdentifier<S>,
    named: string | number | symbol,
    options?: Options
) {
    return <C extends ReactComponent>(Target: C) => {
        return createHOC(Target, propName, () => useNamedService<S>(id, named), options);
    };
}

export function injectAllNamedServices<S>(
    propName: string,
    id: interfaces.ServiceIdentifier<S>,
    named: string | number | symbol,
    options?: Options
) {
    return <C extends ReactComponent>(Target: C) => {
        return createHOC(Target, propName, () => useAllNamedService<S>(id, named), options);
    };
}

export function injectTaggedService<S>(
    propName: string,
    id: interfaces.ServiceIdentifier<S>,
    key: string | number | symbol,
    value: any,
    options?: Options
) {
    return <C extends ReactComponent>(Target: C) => {
        return createHOC(Target, propName, () => useTaggedService<S>(id, key, value), options);
    };
}

export function injectAllTaggedServices<S>(
    propName: string,
    id: interfaces.ServiceIdentifier<S>,
    key: string | number | symbol,
    value: any,
    options?: Options
) {
    return <C extends ReactComponent>(Target: C) => {
        return createHOC(Target, propName, () => useAllTaggedService<S>(id, key, value), options);
    };
}

export function resolve<S>(
    propName: string,
    constructor: interfaces.Newable<S>,
    options?: Options
) {
    return <C extends ReactComponent>(Target: C) => {
        return createHOC(Target, propName, () => useResolve<S>(constructor), options);
    };
}
