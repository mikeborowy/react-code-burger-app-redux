import React, { Component } from 'react';

const withAsync = (importedComponent) => (name) => {
    class WithAsync extends Component {
        state = {
            component: null
        }

        componentDidMount () {
            importedComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }

        render () {
            const Component = this.state.component;
            return Component ? <Component {...this.props} /> : null;
        }
    }

    WithAsync.displayName = `withAsync(${name})`;

    return WithAsync;
}

export default withAsync;