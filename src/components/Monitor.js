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

const CodeEditor = dynamic(import('./code-with-simple'), {ssr: false});

export default class extends React.Component {
    render() {
        const {code, tests, errors, player, testsResults, testScore, order, mode} = this.props;

        return (
            <div>
                <div
                    className={
                        errors.length
                            ? 'editor monitor editor--error'
                            : 'editor monitor' + ' status-' + order
                    }
                >
                    <h4>
                        {player}
                        <div>{testScore} % Done</div>
                    </h4>
                    {mode !== 'monitor' && <div className="noise" />}
                    <CodeEditor value={code} errors={errors} order={order} />
                </div>
                <Tests tests={tests} testsResults={testsResults} />
            </div>
        );
    }
}

//{errors.length ? <Errors errors={errors} /> : null}
