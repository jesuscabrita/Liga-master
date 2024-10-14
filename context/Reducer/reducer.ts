export const ReducerApp = (state: any, action: { type: any; payload?: any; }) => {
    switch (action?.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action?.payload,
            };
        case 'SET_LOGIN_ERROR':
            return {
                ...state,
                loginError: action?.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};