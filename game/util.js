import _ from 'underscore'

export function canBePangram(word) {
    if (typeof word !== 'string') return false
    const uniques = uniqueChars(word)
    return uniques.length === 7
}

export function uniqueChars(word) {
    if (typeof word !== 'string') return []
    const chars = word.split('')
    return chars.filter((value, index, self) =>
        self.indexOf(value) === index)
}

export function getQualifyingWords({ wordsList, keyLetter, letters }) {
    let answers = {}
    wordsList.forEach(word => {
        const uniques = uniqueChars(word)
        if (
            !_.contains(uniques, keyLetter) ||
            _.without(uniques, ...letters).length > 0
        ) return

        answers[word] = 1
    })
    return answers
}

export function possibleScore(answers) {
    let score = 0
    Object.keys(answers).forEach(ans => {
        score += ans.length < 5 ? 4 : ans.length
    })
    return score
}