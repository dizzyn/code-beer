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

export default class extends React.Component {
    render() {
        let name, email, veteran;
        return (
            <div className="form">
                <div className="group">
                    <input
                        type="text"
                        defaultValue=" "
                        required
                        ref={node => {
                            name = node;
                        }}
                    />
                    <span className="highlight" />
                    <span className="bar" />
                    <label>Name</label>
                </div>

                <div className="group">
                    <input
                        type="text"
                        required
                        defaultValue="@"
                        ref={node => {
                            email = node;
                        }}
                    />
                    <span className="highlight" />
                    <span className="bar" />
                    <label>Email</label>
                </div>

                <button
                    onClick={e =>
                        this.props.onDone({
                            email: email.value,
                            name: name.value,
                        })}
                >
                    Start
                </button>

                <button
                    onClick={e =>
                        this.props.onDone({
                            email: email.value,
                            name: name.value,
                            veteran: true,
                        })}
                >
                    Start as veteran
                </button>
            </div>
        );
    }
}

//{errors.length ? <Errors errors={errors} /> : null}
