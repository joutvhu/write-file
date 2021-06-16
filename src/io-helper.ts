import * as core from '@actions/core';
import {Inputs} from './constants';

export interface WriteFileInputs {
    path: string;
    contents: string;
    mode: string;
    encoding: string;
}

/**
 * Helper to get all the inputs for the action
 */
export function getInputs(): WriteFileInputs {
    const result: WriteFileInputs | any = {};

    result.path = core.getInput(Inputs.Path, {required: true});

    result.contents = core.getInput(Inputs.Contents, {required: true});

    result.mode = core.getInput(Inputs.Mode, {required: true});
    if (!['append', 'overwrite', 'preserve'].includes(result.mode))
        result.mode = 'overwrite';

    result.encoding = core.getInput(Inputs.Encoding, {required: false});
    if (!['ascii', 'utf8', 'utf-8', 'utf16le', 'ucs2', 'ucs-2', 'base64', 'base64url', 'latin1', 'binary', 'hex'].includes(result.encoding))
        delete result.encoding;

    return result;
}
