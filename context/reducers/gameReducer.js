export const initialState = {
    keyLetter: null,
    nonKeyLetters: [],
    hasLetter: {},
    possibleScore: null
}

export const actions = {
    UPDATE_GAME: 1
}

export function GameReducer(state, action) {

    switch (action.type) {

        case actions.UPDATE_GAME:
            const { letters, possibleScore } = action.payload
            const hasLetter = {}, nonKeyLetters = []
            let keyLetter
            letters.forEach(l => {
                if (l.isKey) keyLetter = l
                else nonKeyLetters.push(l)
                hasLetter[l.text] = true
            })
            return {
                ...state,
                keyLetter,
                nonKeyLetters,
                hasLetter,
                possibleScore
            }
    }
}