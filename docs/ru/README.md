# react-inversify

Набор декораторов и хуков для взаимодействия с [InversifyJS](https://github.com/inversify/InversifyJS/) контейнером в [React](https://github.com/facebook/react) компонентах.

<div align="center">
    <a href="https://www.npmjs.com/package/@redtea/react-inversify"><img src="https://img.shields.io/npm/v/@redtea/react-inversify.svg" alt="Version" /></a>
</div>

[EN](https://github.com/org-redtea/react-inversify/blob/master/README.md)

## Установка

Yarn
```bash
$ yarn add -E @redtea/react-inversify
```
Npm
```bash
$ npm install -E @redtea/react-inversify
```

## Пример

```typescript
import {useService} from '@redtea/react-inversify';

function ReactComponent(props: {}) {
    const service = useService<Service>(TYPES.service);
    return service.getMessage();
}
```

## Перед использованием

Подключение контейнера

```typescript
import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'inversify';
import {Context, useService} from '@reatea/react-inversify';

const ReactComponent: React.FC<{}> = (props) => {
    const service = useService<Service>(TYPES.service);
    return service.getMessage();
}

const App: React.FC<{container: Container}> = (props) => (
    <Context.Provider value={props.container}>
        <ReactComponent/>
    </Context.Provider>
);

const container = new Container();

// ...регистрация сервисов в контейнере

ReactDOM.render(<App container={container} />, document.getElementById('root'));
```

## Хуки

 * [useContainer()](#usecontainer)
 * [useService(id)](#useserviceid)
 * [useAllServices(id)](#useallservicesid)
 * [useNamedService(id, named)](#usenamedserviceid-named)
 * [useAllNamedServices(id, named)](#useallnamedservicesid-named)
 * [useTaggedService(id, key, value)](#usetaggedserviceid-key-value)
 * [useAllTaggedServices(id, key, value)](#usealltaggedservicesid-key-value)
 * [useResolve(constructor)](#useresolveconstructor)

#### useContainer()

[↑ back](#хуки)

Получение контейнера. 

(см. [Container](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#the-container-api))

```typescript
import {useContainer} from '@redtea/react-inversify';

function ReactComponent(props: {}) {
    const container = useContainer();
    const service = React.useMemo(
        () => container.get<Service>('service'),
        [container]
    );
    return service.getMessage();
}
```

#### useService(id)

[↑ back](#хуки)

Получение сервис по идентификатору `id`. 

(см. [Container.get](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#the-container-api))

```typescript
import {useService} from '@redtea/react-inversify';

function ReactComponent(props: {}) {
    const service = useService<Service>(TYPES.service);
    return service.getMessage();
}
```

#### useAllServices(id)

[↑ back](#хуки)

Получение всех сервисов по идентификатору `id`. 

(см. [Container.getAll](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containergetall))

```typescript
import {useAllServices} from '@redtea/react-inversify';

function ReactComponent(props: {}) {
    const services = useAllServices<Service>(TYPES.service);
    return services
        .map(_ => _.getMessage())
        .join(',');
}
```

#### useNamedService(id, named)

[↑ back](#хуки)

Получение сервиса по идентификатору `id` и названию `named`. 

(см. [Container.getNamed](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containergetnamed))

```typescript
import {useNamedService} from '@redtea/react-inversify';

function ReactComponent(props: {}) {
    const service = useNamedService<Service>(TYPES.service, 'name');
    return service.getMessage();
}
```

#### useAllNamedServices(id, named)

[↑ back](#хуки)

Получение все сервисов по идентификатору `id` и названию `named`. 

(см. [Container.getAllNamed](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containergetallnamed))

```typescript
import {useAllNamedService} from '@redtea/react-inversify';

function ReactComponent(props: {}) {
    const services = useAllNamedService<Service>(TYPES.service, 'name');
    return services
        .map(_ => _.getMessage())
        .join(',');
}
```

#### useTaggedService(id, key, value)

[↑ back](#хуки)

Получение сервиса по идентификатору `id`, ключу тега `key` и значению тега `value`.
 
(см. [Container.getTagged](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containergettagged))

```typescript
import {useTaggedService} from '@redtea/react-inversify';

function ReactComponent(props: {}) {
    const service = useTaggedService<Service>(TYPES.service, 'key', 'value');
    return service.getMessage();
}
```

#### useAllTaggedServices(id, key, value)

[↑ back](#хуки)

Получение все сервисов по идентификатору `id`, ключу тега `key` и значению тега `value`.

(см. [Container.getAllTagged](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containergetalltagged))

```typescript
import {useAllTaggedService} from '@redtea/react-inversify';

function ReactComponent(props: {}) {
    const services = useAllTaggedService<Service>(TYPES.service, 'key', 'value');
    return services
        .map(_ => _.getMessage())
        .join(',');
}
```

#### useResolve(constructor)

[↑ back](#хуки)

Создание экземпляра сервиса в контексте контейнера. 

(см. [Container.resolve](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containerresolveconstructor-newable))

```typescript
import {useResolve} from '@redtea/react-inversify';

function ReactComponent(props: {}) {
    const service = useResolve<Service>(Service);
    return service.getMessage();
}
```

## Декораторы

 * [injectContainer(propName, [options])](#injectcontainerpropname-options)
 * [injectService(propName, id, [options])](#injectservicepropname-id-options)
 * [injectAllServices(propName, id, [options])](#injectallservicespropname-id-options)
 * [injectNamedService(propName, id, named, [options])](#injectnamedservicepropname-id-named-options)
 * [injectAllNamedServices(propName, id, named, [options])](#injectallnamedservicespropname-id-named-options)
 * [injectTaggedService(propName, id, key, value, [options])](#injecttaggedservicepropname-id-key-value-options)
 * [injectAllTaggedServices(propName, id, key, value, [options])](#injectalltaggedservicespropname-id-key-value-options)
 * [resolve(propName, constructor, [options])](#resolvepropname-constructor-options)
 * [options](#options)

#### injectContainer(propName, [options])

[↑ back](#декораторы)

Получение контейнера и запись его в prop `propName`. 

(см. [Container](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#the-container-api))

```typescript
import {Container} from 'inversify';
import {injectContainer} from '@redtea/react-inversify';

type Props = {
    container?: Container;
}

@injectContainer('container')
class ReactComponent extends React.Component<Props> {
    componentDidMount() {
        const service = this.props.container!.get<Service>(TYPES.service);
        service.callMethod();
    }

    render() {
        // ...
    }
}
```

#### injectService(propName, id, [options])

[↑ back](#декораторы)

Получение сервис по идентификатору `id` и запись его в prop `propName`. 

(см. [Container.get](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#the-container-api))

```typescript
import {injectService} from '@redtea/react-inversify';

type Props = {
    service?: Service;
}

@injectService('service', TYPES.service)
class ReactComponent extends React.Component<Props> {
    componentDidMount() {
        this.props.service!.callMethod();
    }

    render() {
        // ...
    }
}
```

#### injectAllServices(propName, id, [options])

[↑ back](#декораторы)

Получение всех сервисов по идентификатору `id` и запись из в prop `propsName`. 

(см. [Container.getAll](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containergetall))

```typescript
import {injectAllServices} from '@redtea/react-inversify';

type Props = {
    services?: Service[];
}

@injectAllServices('services', TYPES.service)
class ReactComponent extends React.Component<Props> {
    componentDidMount() {
        for (const service of this.props!.services) {
            service.callMethod();
        }
    }

    render() {
        // ...
    }
}
```

#### injectNamedService(propName, id, named, [options])

[↑ back](#декораторы)

Получение сервиса по идентификатору `id`, названию `named` и запись его в prop `propName`. 

(см. [Container.getNamed](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containergetnamed))

```typescript
import {injectNamedService} from '@redtea/react-inversify';

type Props = {
    service?: Service;
}

@injectNamedService('service', TYPES.service, 'name')
class ReactComponent extends React.Component<Props> {
    componentDidMount() {
        this.props.service!.callMethod();
    }

    render() {
        // ...
    }
}
```

#### injectAllNamedServices(propName, id, named, [options])

[↑ back](#декораторы)

Получение все сервисов по идентификатору `id`, названию `named` и запись их в prop `propName`. 

(см. [Container.getAllNamed](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containergetallnamed))

```typescript
import {injectAllNamedServices} from '@redtea/react-inversify';

type Props = {
    services?: Service[];
}

@injectAllNamedServices('services', TYPES.service, 'name')
class ReactComponent extends React.Component<Props> {
    componentDidMount() {
        for (const service of this.props!.services) {
            service.callMethod();
        }
    }

    render() {
        // ...
    }
}
```

#### injectTaggedService(propName, id, key, value, [options])

[↑ back](#декораторы)

Получение сервиса по идентификатору `id`, ключу тегу `key`, значению тегу `value` и запись его в prop `propName`. (см. [Container.getTagged](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containergettagged))

```typescript
import {injectTaggedService} from '@redtea/react-inversify';

type Props = {
    service?: Service;
}

@injectTaggedService('service', TYPES.service, 'key', 'value')
class ReactComponent extends React.Component<Props> {
    componentDidMount() {
        this.props.service!.callMethod();
    }

    render() {
        // ...
    }
}
```

#### injectAllTaggedServices(propName, id, key, value, [options])

[↑ back](#декораторы)

Получение все сервисов по идентификатору `id`, ключу тегу `key`, значению тегу `value` и запись их в prop `propName`. 

(см. [Container.getAllTagged](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containergetalltagged))

```typescript
import {injectAllTaggedServices} from '@redtea/react-inversify';

type Props = {
    services?: Service[];
}

@injectAllTaggedServices('services', TYPES.service, 'key', 'value')
class ReactComponent extends React.Component<Props> {
    componentDidMount() {
        for (const service of this.props!.services) {
            service.callMethod();
        }
    }

    render() {
        // ...
    }
}
```

#### resolve(propName, constructor, [options])

[↑ back](#декораторы)

Создание экземпляра сервиса в контексте контейнера и запись его в prop 'propName`. 

(см. [Container.resolve](https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containerresolveconstructor-newable))

```typescript
import {resolve} from '@redtea/react-inversify';

type Props = {
    service?: Service;
}

@resolve('service', Service)
class ReactComponent extends React.Component<Props> {
    componentDidMount() {
        this.props.service!.callMethod();
    }

    render() {
        // ...
    }
}
```

#### Options

[↑ back](#декораторы)

Опции декоратора

 * **forwardRef**(опционально): [Перенаправление ref](https://ru.reactjs.org/docs/forwarding-refs.html)

```typescript
{              
    forwardRef?: boolean;
}
```
пример
```typescript
import {injectService} from '@redtea/react-inversify';

@injectService('service', TYPES.service, {forwardRef: true})
class ReactComponent extends React.Component<{}> {
    render() {
        // ...
    }
}
```
