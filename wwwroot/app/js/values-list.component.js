class ValuesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { values: [] };
    }

    componentDidMount() {
        fetch('/api/values').then(async response => {
            const result = await response.json();
            if (result.data) {
                this.setState({ values: result.data });
            }
        });
    }

    render() {
        const { values } = this.state;
        return (
            <ul className="list-group">
                {
                    values.map(v => <ValuesListItem key={v.id} item={v} ></ValuesListItem>)
                }
            </ul>
        );
    }
}

class ValuesListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                {item.text}
                <span className="badge bg-primary rounded-pill">{item.id}</span>
            </li>
        );
    }
}

ReactDOM.render(
    <ValuesList />,
    document.getElementById('values-list')
);