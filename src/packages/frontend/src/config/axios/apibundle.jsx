import base from '@axios/base';
import global from '@axios/routes/global';

const bundle = {
    init(opts) {
        const client = base.init(opts);
        return {
            global: global.init(client),
        };
    },
};

export default bundle;
