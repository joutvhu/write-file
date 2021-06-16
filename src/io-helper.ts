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
    const result: WriteFileInputs | any = {
        path: ".",
        contents: "",
        mode: "overwrite"
    };

    result.path = core.getInput(Inputs.Path, {required: true});

    result.contents = core.getInput(Inputs.Contents, {required: true});

    result.mode = core.getInput(Inputs.Mode, {required: true});

    result.encoding = core.getInput(Inputs.Encoding, {required: false});

    return result;
}
