import { useState, useEffect, useMemo, useRef } from 'react'
import http from 'axios'

const MAX_RESULTS = 100

const initialCheckedState = (new Array(MAX_RESULTS)).fill(false)

export default function EditPage() {

    const [words, setWords] = useState([])
    const [wordsToDelete, setWordsToDelete] = useState([])
    const [checkedState, setCheckedState] = useState(initialCheckedState)

    const uniqRef = useRef()
    const freqHighRef = useRef()
    const freqLowRef = useRef()
    const lengthRef = useRef()
    const lengthLowerRef = useRef()

    const handleSearch = async () => {
        setCheckedState(initialCheckedState)

        const filters = {
            maxResults: MAX_RESULTS
        }

        if (uniqRef.current.value) {
            filters.uniqueEq = uniqRef.current.value
        }

        if (lengthRef.current.value) {
            filters.lengthEq = lengthRef.current.value

            if (lengthLowerRef.current.value === true) {
                filters.lengthLt = lengthRef.current.value
            }
        }

        if (!freqHighRef.current.value && !freqLowRef.current.value) {
            filters.frequencyLt = 1
        } else {
            filters.frequencyLt = freqHighRef.current.value || Number.MAX_SAFE_INTEGER
            filters.frequencyGt = freqLowRef.current.value || 0
        }

        const resp = await http.post('api/dictionary', filters)
        const results = resp.data
        if (results.length) {
            setWords(results)
        }
    }

    const handleOnCheckboxChange = index => setCheckedState(
        previous => {
            return previous.map((c, i) => i === index ? !c : c)
        }
    )

    useEffect(() => {
        let toDelete = []
        for (let i in checkedState) {
            if (checkedState[i] === true && words[i]) {
                toDelete.push(words[i])
            }
        }
        setWordsToDelete(toDelete)
    }, [checkedState])

    const deleteSelected = () => {
        const words = wordsToDelete.map(w => w.word)
        const confirmed = confirm(`Are you sure you want to remove "${words}"?`)
        if (confirmed) {
            const ids = wordsToDelete.map(w => w.id)
            http.delete('/api/dictionary', { data: { ids } }).then(handleSearch)
        }
    }

    const deleteDisplay = useMemo(
        () => wordsToDelete.reduce((prev, curr) => prev += `${curr.word}\n`, ''),
        [wordsToDelete]
    )

    return (
        <section>
            <h2>Dictionary</h2>

            <div style={controlPanelStyle}>
                <input ref={uniqRef} id="uniqueLetters" type="number" style={inputStyle} />
                <label htmlFor="uniqueLetters">Unique</label>

                <input ref={lengthRef} id="length" type="number" style={inputStyle} />
                <label htmlFor="length">Length</label>

                <input ref={lengthLowerRef} type="checkbox" id="lengthLower" />
                <label htmlFor="lengthLower">below</label>

                <input ref={freqLowRef} id="freqLow" type="number" step={100} style={inputStyle} />
                <label htmlFor="freqLow">Freq Low</label>

                <input ref={freqHighRef} id="freqHigh" type="number" step={100} style={inputStyle} />
                <label htmlFor="freqHigh">Freq High</label>
            </div>

            <button style={buttonStyle} onClick={handleSearch}>Go</button>

            <div style={container}>
                <div style={leftPane}>
                    <textarea style={displayStyle} readOnly value={deleteDisplay}></textarea>
                    <button style={buttonStyle} onClick={deleteSelected}>
                        Delete words
                    </button>
                </div>
                <div style={rightPane}>
                    <ul style={wordListStyle}>
                        {words.map(({ word, id }, index) => (
                            <li key={id} style={wordRowStyle}>
                                <input
                                    type="checkbox"
                                    id={`del-chkbox-${index}`}
                                    name={word}
                                    value={word}
                                    checked={checkedState[index]}
                                    onChange={() => handleOnCheckboxChange(index)}
                                ></input>
                                <label
                                    onClick={() => handleOnCheckboxChange(index)}
                                    htmlFor={`del-checkbox-${index}`}>
                                    {word}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

const container = {
    display: 'flex',
}

const leftPane = {
    width: '25%',
    flexBasis: '10em'
}

const rightPane = {

}

const controlPanelStyle = {
    fontSize: '0.7em'
}

const inputStyle = {
    width: '4em',
    margin: '0 0.5em'
}

const buttonStyle = {
    margin: ' 0.6em 1.2em',
    borderRadius: '10px',
    padding: '5px',
    fontSize: '0.8em'
}

const wordRowStyle = {
    lineHeight: '2em'
}

const wordListStyle = {
    margin: '30px auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 25%)',
    listStyleType: 'none',
    gridColumnGap: '10px'
}

const displayStyle = {
    minHeight: '40em'
}
