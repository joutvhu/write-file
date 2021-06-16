import * as core from '@actions/core';
import {mkdirP} from '@actions/io';
import {appendFileSync, existsSync, writeFileSync} from 'fs';
import {dirname} from 'path';
import {getInputs, WriteFileInputs} from './io-helper';

(async function run() {
    try {
        const inputs: WriteFileInputs = getInputs();

        if (inputs.mode !== 'preserve' || !existsSync(inputs.path)) {
            const targetDir = dirname(inputs.path);
            await mkdirP(targetDir);

            if (inputs.mode === 'overwrite') {
                writeFileSync(inputs.path, inputs.contents);
            } else {
                appendFileSync(inputs.path, inputs.contents);
            }
        }
    } catch (err) {
        core.setFailed(err.message);
    }
})();
