export default class extends React.Component {
    render() {
        const {tests, testsResults} = this.props;

        //console.log({tests, testsResults});
        //if (testsResults.length !== tests.length)
        //return 'Error: not match the count of tests and test results';

        return (
            <div>
                <ul className="log">
                    {tests.map((title, i) => {
                        const res = testsResults[i];
                        return (
                            <li key={i}>
                                <div
                                    className={
                                        res && res.passed
                                            ? 'log__header success'
                                            : 'log__header error'
                                    }
                                >
                                    <i className="material-icons">
                                        {res && res.passed ? 'check_circle' : 'error'}
                                    </i>
                                    <span style={{fontFamily: "'Ubuntu Mono', monospace"}}>
                                        {title}
                                    </span>
                                </div>

                                <div className="log__footer">
                                    {res && !res.passed
                                        ? 'Received: ' + (res.received ? res.received : '---')
                                        : ''}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
