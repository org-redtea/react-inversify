import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';


const config = [
    {
        input: 'esnext/index.js',
        output: {
            name: 'ReactInversify',
            file: pkg.browser,
            format: 'umd',
            exports: 'named',
            esModule: true
        },
        plugins: [
            resolve(),
            commonjs(),
            babel({
                babelHelpers: 'bundled'
            })
        ],
        external: [
            'react',
            'inversify'
        ]
    },
    {
        input: 'esnext/index.js',
        output: {
            name: 'ReactInversify',
            file: pkg.main,
            format: 'cjs',
            exports: 'named'
        },
        plugins: [
            resolve(),
            commonjs(),
            babel({
                babelHelpers: 'bundled'
            })
        ],
        external: [
            'react',
            'inversify'
        ]
    },
    {
        input: 'esnext/index.js',
        output: [
            {
                file: pkg.module,
                format: 'es'
            }
        ],
        plugins: [
            resolve(),
            commonjs(),
            babel({
                babelHelpers: 'bundled'
            })
        ],
        external: [
            'react',
            'inversify'
        ]
    }
];

export default config;
