function authReducer(state={}, actions){
    console.log('reducer chala', actions)
    switch(actions.type) {
        case 'SET_USER': {
            return { ...state, user: actions.data }
        }
        case 'UNSET_USER': {
            return { ...state, user: null }
        }
        default: {
            return state
        }
    }

}

export default authReducer