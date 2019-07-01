import PropTypes from 'prop-types';

export const Ingredient = PropTypes.shape({
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.string.isRequired,
  prop3: PropTypes.number.isRequired,
});
