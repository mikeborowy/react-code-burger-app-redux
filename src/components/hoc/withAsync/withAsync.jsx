import React, { Component } from 'react';

export const withAsync = (importedComponent) => {
  return (name) => {
    class WithAsync extends Component {
      state = {
        component: null,
      };

      componentDidMount() {
        importedComponent().then((module) => {
          const component = module.hasOwnProperty('default') ? module.default : module[name];

          this.setState({
            component,
          });
        });
      }

      render() {
        const { component } = this.state;
        const Component = component;
        return Component ? <Component {...this.props} /> : null;
      }
    }

    WithAsync.displayName = `withAsync(${name})`;

    return WithAsync;
  };
};
