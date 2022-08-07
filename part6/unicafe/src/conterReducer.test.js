import deepFreeze from 'deep-freeze'
import counterReducer from "./counterReducer";

const INITIAL_STATE = {
    good: 0,
    neutral: 0,
    bad: 0,
}

describe('<counterReducer />', () => {
    it('returns default state, when state is undefined', () => {
        const action = {
            type: 'UNKNOWN'
        }
        const newState = counterReducer(undefined, action)
        expect(newState).toEqual(INITIAL_STATE)
    })
    it('returns state\'s good field increased by 1, when action type is GOOD', () => {
        const state = INITIAL_STATE
        const action = {
            type: 'GOOD'
        }

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            neutral: 0,
            bad: 0,
        })
    })
    it('returns state\'s neutral field increased by 1, when action type is NEUTRAL', () => {
        const state = INITIAL_STATE
        const action = {
            type: 'NEUTRAL'
        }

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            neutral: 1,
            bad: 0,
        })
    })
    it('returns state\'s bad field increased by 1, when action type is BAD', () => {
        const state = INITIAL_STATE
        const action = {
            type: 'BAD'
        }

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            neutral: 0,
            bad: 1,
        })
    })
})