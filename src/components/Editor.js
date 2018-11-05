import {debounce} from 'lodash';
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/styles/hljs';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import dynamic from 'next/dynamic';
import Tests from './Tests';
import Errors from './Errors';

//const CodeWithMonaco = dynamic(import('./code-with-monaco'), {ssr: false});
//const CodeMirror = dynamic(import('./code-with-codemirror'), {ssr: false});
const CodeEditor = dynamic(import('./code-with-simple'), {ssr: false});

export const UPDATE_CODE = gql`
    mutation($playerId: String, $code: String) {
        updateCode(playerId: $playerId, code: $code) {
            code
        }
    }
`;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: props.code || '',
        };
    }

    handleChange = (code, done) => this.setState(() => ({code}), done);

    render() {
        const {
            tests,
            testsResults,
            testScore,
            player,
            errors,
            errorLine,
            id,
            originalCode,
            order,
        } = this.props;
        const {code} = this.state;

        return (
            <div className={errors.length ? 'editor editor--error' : 'editor' + ' status-' + order}>
                <Mutation mutation={UPDATE_CODE} ignoreResults={false}>
                    {(update, {loading, error}) => (
                        <div className="editor__container">
                            <h4>
                                {player}
                                <span>Veteran</span>
                                <span>☠️ Blinking Distraction ☠️</span>
                                <div>{testScore} % Done</div>
                            </h4>

                            {originalCode !== code && (
                                <button
                                    tabIndex={-1}
                                    className="reset-code"
                                    onClick={e => {
                                        this.handleChange(
                                            originalCode,
                                            debounce(
                                                () =>
                                                    update({
                                                        variables: {
                                                            playerId: id,
                                                            code: originalCode,
                                                        },
                                                    }),
                                                100
                                            )
                                        );
                                    }}
                                >
                                    Reset Code
                                </button>
                            )}
                            <CodeEditor
                                style={{width: '100%', height: '100%'}}
                                value={code}
                                order={order}
                                onValueChange={code => {
                                    this.handleChange(
                                        code,
                                        debounce(
                                            () => update({variables: {playerId: id, code}}),
                                            100
                                        )
                                    );
                                }}
                                errors={errors}
                                // errorLine={errorLine}
                            />
                            <Tests tests={tests} testsResults={testsResults} />
                        </div>
                    )}
                </Mutation>
            </div>
        );
    }
}
