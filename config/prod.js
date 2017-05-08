import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace  from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify'
// import postcss from 'rollup-plugin-postcss';
// import css from 'rollup-plugin-css-only'
import scss from 'rollup-plugin-sass';
export default {
    entry: 'src/index',
    dest: 'lib/index.js',
    format: 'cjs',
    moduleName:'slider',
    sourceMap:true,
    external: [ 'react','node-sass' ],
    plugins: [

        scss({
            output:'./lib/slider.css',
        }),
        resolve(),
        babel({
            exclude: 'node_modules/**'
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                './node_modules/react/react.js': [
                    "Component",
                    "PropTypes"
                ]
            }
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'production' )
        })
        // uglify({
        // compress: {
        //     screw_ie8: true,
        //     warnings: false
        // },
        // output: {
        //     comments: false
        // },
    ],
}
