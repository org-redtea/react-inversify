import {useContext, useMemo} from 'react';
import {Container, interfaces} from 'inversify';
import {Context} from './context';

export const useContainer = (): Container => useContext(Context);

export const useService = <T>(
    id: interfaces.ServiceIdentifier<T>
): T => {
    const container = useContainer();
    return useMemo(() => container.get<T>(id), [container, id]);
};

export const useAllServices = <T>(
    id: interfaces.ServiceIdentifier<T>
): T[] => {
    const container = useContainer();
    return useMemo(() => container.getAll<T>(id), [container, id]);

};

export const useNamedService = <T>(
    id: interfaces.ServiceIdentifier<T>,
    named: string | number | symbol
): T => {
    const container = useContainer();
    return useMemo(() => container.getNamed<T>(id, named), [container, id, named]);
};

export const useAllNamedService = <T>(
    id: interfaces.ServiceIdentifier<T>,
    named: string | number | symbol
): T[] => {
    const container = useContainer();
    return useMemo(() => container.getAllNamed<T>(id, named), [container, id, named]);
};

export const useTaggedService = <T>(
    id: interfaces.ServiceIdentifier<T>,
    key: string | number | symbol,
    value: any
): T => {
    const container = useContainer();
    return useMemo(() => container.getTagged<T>(id, key, value), [container, key, value]);
};

export const useAllTaggedService = <T>(
    id: interfaces.ServiceIdentifier<T>,
    key: string | number | symbol,
    value: any
): T[] => {
    const container = useContainer();
    return useMemo(() => container.getAllTagged<T>(id, key, value), [container, key, value]);
};

export const useResolve = <T>(constructor: interfaces.Newable<T>): T => {
    const container = useContainer();
    return useMemo(() => container.resolve<T>(constructor), [constructor, container]);
};
