import { readFileSync ,writeFileSync} from 'fs';
import { extname,basename,dirname } from 'path';
import { createFilter } from 'rollup-pluginutils';

const mimeTypes = {
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png':  'image/png',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml'
};

export default function image ( options = {} ) {
    const filter = createFilter( options.include, options.exclude );
    let images = [];
    return {
        name: 'image',

        load ( id ) {
            if ( !filter( id ) ) return null;

            const mime = mimeTypes[ extname( id ) ];
            if ( !mime ) return null; // not an image

            if (images.indexOf(id) < 0) {
                images.push(id);
            }
            const dir = dirname(id)
            const code = `const img =  ('${dir}/${basename(id)}'); export default img;`;
            const ast = {
                type: 'Program',
                sourceType: 'module',
                start: 0,
                end: null,
                body: []
            };

            return { ast, code, map: { mappings: '' } };
        },
        ongenerate(options, rendered) {
            const dir = dirname(options.dest);
            images.forEach(id => {
                writeFileSync(`${dir}/${basename(id)}`, readFileSync(id));
            });
        }
    };
}