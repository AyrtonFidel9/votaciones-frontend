import { PropTypes } from 'prop-types';

export default PropTypes.shape({
    id: PropTypes.number.isRequired,
    usuario: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
});