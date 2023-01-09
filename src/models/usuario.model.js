import { PropTypes } from 'prop-types';

export default PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombres: PropTypes.string.isRequired,
    apellidos: PropTypes.string.isRequired,
    cedula: PropTypes.string.isRequired,
    celular: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    codigo: PropTypes.number.isRequired,
    idAgencia: PropTypes.number.isRequired,
    billeteraAddress: PropTypes.string.isRequired,
});