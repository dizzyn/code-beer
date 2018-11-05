import React from 'react';

import CodeEditor from 'react-simple-code-editor';
import {highlight, languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import Errors from './Errors';

export default props => {
    return (
        <div className="editor__container-content">
            <CodeEditor
                value={props.value}
                onValueChange={() => null}
                padding={10}
                highlight={code => highlight(code, languages.js)}
                className={props.errors.length ? 'editor--error' : null}
                {...props}
            />

            {props.order === 1 && (
                <div className="status-overlay status-overlay--success">Winner</div>
            )}
            {props.order === 2 && (
                <div className="status-overlay status-overlay--second">Second</div>
            )}
            {props.errors.length ? <Errors errors={props.errors} /> : null}
        </div>
    );
};
