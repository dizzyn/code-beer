window.MonacoEnvironment = {baseUrl: '/monaco-editor-external'};
import * as monaco from '@timkendrick/monaco-editor/dist/external';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import '@timkendrick/monaco-editor/dist/external/monaco.css';

window.MonacoEnvironment = {
    getWorkerUrl: function(moduleId, label) {
        return './monaco.worker.js';
    },
};

export default props => (
    <MonacoEditor
        width={500}
        height={200}
        language="javascript"
        theme="vs-dark"
        value=""
        options={{selectOnLineNumbers: true}}
        onChange={() => null}
        editorDidMount={() => null}
        {...props}
    />
);
