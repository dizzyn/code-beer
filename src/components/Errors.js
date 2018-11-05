export default class extends React.Component {
    render() {
        const {errors} = this.props;

        return (
            <ul className="log log--editor">
                {errors.map((err, i) => (
                    <li key={i}>
                        <div className="log__header error">
                            <i className="material-icon">error</i>
                            {err}
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
}
