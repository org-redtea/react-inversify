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
import React, {Component} from 'react';
import {Container} from 'inversify';
import {Service} from './service';
import {Tokens} from './tokens';

@injectContainer('container')
export class InjectContainer extends Component<{ cb(c: Container): void; container?: Container; }> {
    componentDidMount() {
        this.props.cb(this.props.container!);
    }

    render() {
        return null;
    }
}

@injectService('service', Tokens.service)
export class InjectService extends Component<{ service?: string }> {
    render() {
        return <span>{this.props.service!}</span>;
    }
}

@injectAllServices('services', Tokens.services)
export class InjectAllServices extends Component<{ services?: string[] }> {
    render() {
        return <span>{this.props.services!.join(',')}</span>;
    }
}

@injectNamedService('service', Tokens.namedService, 'service')
export class InjectNamedService extends Component<{ service?: string }> {
    render() {
        return <span>{this.props.service!}</span>;
    }
}

@injectAllNamedServices('services', Tokens.services, 'services')
export class InjectAllNamedServices extends Component<{ services?: string[] }> {
    render() {
        return <span>{this.props.services!.join(',')}</span>;
    }
}

@injectTaggedService('service', Tokens.taggedService, 'service', '0')
export class InjectTaggedService extends Component<{ service?: string }> {
    render() {
        return <span>{this.props.service!}</span>;
    }
}

@injectAllTaggedServices('services', Tokens.services, 'services', '0')
export class InjectAllTaggedServices extends Component<{ services?: string[] }> {
    render() {
        return <span>{this.props.services!.join(',')}</span>;
    }
}

@resolve<{ value: string }>('service', Service)
export class Resolve extends Component<{ service?: Service }> {
    render() {
        return <span>{this.props.service!.value}</span>;
    }
}

@injectContainer('container')
@injectService('service', Tokens.service)
@injectAllServices('services', Tokens.services)
@injectNamedService('namedService', Tokens.namedService, 'service')
@injectAllNamedServices('namedServices', Tokens.namedServices, 'services')
@injectTaggedService('taggedService', Tokens.taggedService, 'service', '0')
@injectAllTaggedServices('taggedServices', Tokens.taggedServices, 'services', '0')
@resolve<{ value: string }>('resolved', Service)
export class All extends Component<{ onProps(props: any): void }> {
    render() {
        this.props.onProps(this.props);
        return null;
    }
}
