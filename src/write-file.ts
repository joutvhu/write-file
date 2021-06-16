import * as core from '@actions/core';
import {getInputs, WriteFileInputs} from './io-helper';

(async function run() {
    try {
        const inputs: WriteFileInputs = getInputs();
    } catch (err) {
        core.setFailed(err.message);
    }
})();
