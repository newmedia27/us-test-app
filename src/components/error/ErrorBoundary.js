import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

export default class ErrorBoundary extends PureComponent {
	state = {
	  hasError: false,
	}

	componentDidCatch() {
	  this.setState({ hasError: true });
	}

	render() {
	  const { children } = this.props;
	  const { hasError } = this.state;

	  if (hasError) {
	    return <Alert
        message="Error"
        description="This is an error message about copywriting."
        type="error"
        showIcon
      />;
	  }

	  return children;
	}
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};
