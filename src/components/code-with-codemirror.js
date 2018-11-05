import React from 'react';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';

export default props => (
    <CodeMirror
        value={props.value}
        options={{theme: 'material', mode: 'javascript', ...props.options}}
        onChange={() => null}
        {...props}
    />
);
