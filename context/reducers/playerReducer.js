export const initialState = {
    score: 0,
    hasFoundWord: {},
    wordsFoundStack: [],
    wordsFoundAlpha: [],
    isShowingMessage: false
}

export const actions = {
    UPDATE_PLAYER: 0,
    ADD_FOUND_WORD: 1,
    ADD_TO_SCORE: 2
}

export function playerReducer(state, action) {

    let stack, sorted
    
    switch (action.type) {

        case actions.UPDATE_PLAYER:
            stack = Array.from(action.payload.wordsFound)
            sorted = Array.from(stack).sort((a, b) => a < b ? -1 : (b < a ? 1 : 0))
            return {
                ...state,
                wordsFoundStack: stack,
                wordsFoundAlpha: sorted,
                hasFoundWord: stack.reduce((prev, curr) => ({ ...prev, [curr]: true }), {})
            }

        case actions.ADD_FOUND_WORD:
            const word = action.payload
            stack = state.wordsFoundStack.concat([word])
            sorted = Array.from(stack).sort((a, b) => a < b ? -1 : (b < a ? 1 : 0))
            return {
                ...state,
                hasFoundWord: { ...state.hasFoundWord, [word]: true },
                wordsFoundStack: stack,
                wordsFoundAlpha: sorted
            }

        case actions.ADD_TO_SCORE:
            return {
                ...state,
                score: state.score + action.payload
            }
    }
}
