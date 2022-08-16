import * as core from '@actions/core';
import {mkdirP} from '@actions/io';
import {appendFileSync, existsSync, Stats, statSync, writeFileSync} from 'fs';
import {dirname} from 'path';
import {getInputs, setOutputs, WriteFileInputs} from './io-helper';

(async function run() {
    try {
        const inputs: WriteFileInputs = getInputs();

        if (inputs.writeMode !== 'preserve' || !existsSync(inputs.path)) {
            core.info(`Writing ${inputs.path} file.`);

            const targetDir = dirname(inputs.path);
            await mkdirP(targetDir);

            if (inputs.writeMode === 'overwrite') {
                writeFileSync(inputs.path, inputs.contents, inputs.options);
            } else {
                appendFileSync(inputs.path, inputs.contents, inputs.options);
            }

            core.info(`Write ${inputs.path} file successfully.`);
        } else {
            core.info(`The ${inputs.path} file is exists.`);
        }

        const result: Stats = statSync(inputs.path);
        setOutputs(result);
    } catch (err: any) {
        core.setFailed(err?.message ?? err);
    }
})();
