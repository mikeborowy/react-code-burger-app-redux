import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.scss';
import Aux from '../../../hoc/aux/Aux';
import Overlay from '../../../common/overlay/Overlay';

const propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.shape({}),
};
const defaultProps = {
  isOpen: false,
  onClose: () => {},
  children: {},
};

export const Modal = (props) => {
  const { isOpen, onClose, children } = props;
  let style = {};
  style = {
    ...style,
    transform: isOpen ? 'translateY(0)' : 'translate(-100vh)',
    opacity: isOpen ? '1' : '0',
  };

  return (
    <Aux>
      <Overlay isOpen={isOpen} onClose={onClose} />
      <div className={styles.modal} style={style}>
        {children}
      </div>
    </Aux>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
