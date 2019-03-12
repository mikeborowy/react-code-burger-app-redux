import React, { Component } from 'react';
import { getDisplayName } from '../../../helpers/index';

const withAsync = (importedComponent) => {
    class WithAsync extends Component {
        state = {
            component: null
        }

        name = "fsadfsadf"

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

    WithAsync.displayName = `withAsync(${getDisplayName(importedComponent)})`;

    return WithAsync;
}

export default withAsync;