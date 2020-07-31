import {Container} from 'inversify';
import {Tokens} from './tokens';

export function buildContainer(): Container {
    const container = new Container({
        defaultScope: 'Singleton'
    });
    container.bind<string>(Tokens.service).toConstantValue('service')
    container.bind<string>(Tokens.services).toConstantValue('1');
    container.bind<string>(Tokens.services).toConstantValue('2');
    container.bind<string>(Tokens.namedService).toConstantValue('service').whenTargetNamed('service');
    container.bind<string>(Tokens.namedServices).toConstantValue('1').whenTargetNamed('services');
    container.bind<string>(Tokens.namedServices).toConstantValue('2').whenTargetNamed('services');
    container.bind<string>(Tokens.taggedService).toConstantValue('service').whenTargetTagged('service', '0');
    container.bind<string>(Tokens.taggedServices).toConstantValue('1').whenTargetTagged('services', '0');
    container.bind<string>(Tokens.taggedServices).toConstantValue('2').whenTargetTagged('services', '0');
    return container;
}
