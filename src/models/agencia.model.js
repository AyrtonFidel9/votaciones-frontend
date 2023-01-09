import { PropTypes } from 'prop-types';

export default PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    ubicacion: PropTypes.string.isRequired,
    numRepresentantes: PropTypes.number.isRequired,
    numGanadores: PropTypes.number.isRequired,
});