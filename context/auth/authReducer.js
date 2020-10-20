import { 
    REGISTRO_ERROR, 
    REGISTRO_EXISTOSO,
    LIMPIAR_ALERTA
} from './../../types';

export default (state, action) => {
    switch(action.type) {
        case REGISTRO_ERROR:
        case REGISTRO_EXISTOSO:
            return {
                ...state,
                mensaje: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
        default: 
            return state;
    }
}