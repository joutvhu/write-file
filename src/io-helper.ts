import * as core from '@actions/core';
import {Stats, WriteFileOptions} from 'fs';
import {homedir} from 'os';
import {join, resolve} from 'path';
import {Inputs, Outputs} from './constants';

export interface WriteFileInputs {
    path: string;
    contents: string;
    writeMode: string;
    encoding: string;
    options: WriteFileOptions;
}

/**
 * Helper to get all the inputs for the action
 */
export function getInputs(): WriteFileInputs {
    const result: WriteFileInputs | any = {};

    let filePath = core.getInput(Inputs.Path, {required: true});
    if (filePath == null) {
        throw new Error('You must provide either \'path\' in your configuration.');
    } else {
        if (filePath.startsWith('~/') || filePath.startsWith('~\\'))
            filePath = join(homedir(), filePath.slice(1));
        else if (filePath === '~')
            filePath = homedir();
        result.path = resolve(process.cwd(), filePath);
    }

    result.contents = core.getInput(Inputs.Contents, {required: true});

    result.writeMode = core.getInput(Inputs.WriteMode, {required: true});
    if (typeof result.writeMode === 'string')
        result.writeMode = result.writeMode.toLocaleLowerCase();
    if (!['append', 'overwrite', 'preserve'].includes(result.writeMode))
        result.writeMode = 'overwrite';

    result.encoding = core.getInput(Inputs.Encoding, {required: false});
    if (typeof result.encoding === 'string')
        result.encoding = result.encoding.toLocaleLowerCase();
    if (!['ascii', 'utf8', 'utf-8', 'utf16le', 'ucs2', 'ucs-2', 'base64', 'base64url', 'latin1', 'binary', 'hex'].includes(result.encoding))
        result.encoding = 'utf8';

    result.options = {
        encoding: result.encoding
    };

    return result;
}

export function setOutputs(response: Stats): void {
    core.setOutput(Outputs.Size, response.size);
    core.debug('Outputs: size: ' + response.size);
}
