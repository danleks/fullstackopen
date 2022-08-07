const INITIAL_STATE = {
    good: 0,
    neutral: 0,
    bad: 0,
}

const counterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GOOD':
            return Object.assign({}, state, {good: state.good + 1})
        case 'NEUTRAL':
            return Object.assign({}, state, {neutral: state.neutral + 1})
        case 'BAD':
            return Object.assign({}, state, {bad: state.bad + 1})
        default:
            return state
    }
}

export default counterReducer