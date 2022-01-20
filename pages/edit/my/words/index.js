import { useState, useEffect, useMemo, useRef } from 'react'
import http from 'axios'
import styled from 'styled-components'

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

        if (uniqRef.current.value > 0) {
            filters.uniqueEq = uniqRef.current.value
        } else {
            delete filters.uniqueEq
        }

        if (lengthRef.current.value > 0) {
            filters.lengthEq = lengthRef.current.value

            if (lengthLowerRef.current.value === true) {
                filters.lengthLt = lengthRef.current.value
            }
        } else {
            delete filters.lengthEq
        }

        if (freqHighRef.current.value==0 && freqLowRef.current.value==0) {
            filters.frequencyLt = 1
            delete filters.frequencyGt
        } else {
            filters.frequencyLt = freqHighRef.current.value || Number.MAX_SAFE_INTEGER
            filters.frequencyGt = freqLowRef.current.value || 0
        }

        try {
            const resp = await http.post('/api/dictionary', filters)
            const results = resp.data
            setWords(results)
        } catch (error) {
            console.error(error.toJSON().message)
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
            http.delete('/api/dictionary', { data: { ids } }).then(() => handleSearch())
        }
    }

    const deleteDisplay = useMemo(
        () => wordsToDelete.reduce((prev, curr) => prev += `${curr.word}\n`, ''),
        [wordsToDelete]
    )

    return (
        <section>
            <h2>Dictionary</h2>

            <ControlPanel>
                <NumberInput>
                    <input ref={uniqRef} id="uniqueLetters" type="number"
                        min="3" max="10"
                    />
                    <label htmlFor="uniqueLetters">Unique</label>
                </NumberInput>

                <NumberInput>
                    <input ref={lengthRef} id="length" type="number"
                        min="4" max="14"
                    />
                    <label htmlFor="length">Length</label>

                    <input ref={lengthLowerRef} type="checkbox" id="lengthLower" />
                    <label htmlFor="lengthLower">below</label>
                </NumberInput>

                <NumberInput>
                    <input ref={freqLowRef} id="freqLow" type="number"
                        step="500" min="0"
                    />
                    <label htmlFor="freqLow">Freq Low</label>
                </NumberInput>
                
                <NumberInput>
                    <input ref={freqHighRef} id="freqHigh" type="number"
                        step="500" min="0"
                    />
                    <label htmlFor="freqHigh">Freq High</label>
                </NumberInput>

                <Button onClick={handleSearch}>Go</Button>
            </ControlPanel>

            <div style={{display:'flex'}}>
                <LeftPane>
                    <textarea readOnly value={deleteDisplay}></textarea>
                    <Button onClick={deleteSelected}>
                        Delete words
                    </Button>
                </LeftPane>
                <RightPane>
                    <ul>
                        {words.map(({ word, id }, index) => (
                            <li key={id}>
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
                </RightPane>
            </div>
        </section>
    )
}

const LeftPane = styled.div`
width: 25%;
flex-basis: 10em;
textarea {
    min-height: 40em;
}
`

const ControlPanel = styled.div`
font-size: 0.8em;
display: flex;'
`

const RightPane = styled.div`
> ul {
    margin: 30px auto;
    display: grid;
    grid-template-columns: repeat(4, 25%);
    list-style-type: none;
    grid-column-gap: 10px;

    li {
        line-height: 2em;
    }
}
`

const Button = styled.button`
margin: 0.6em 1.2em;
border-radius: 10px;
padding: 5px;
font-size: 0.8em;
`

const NumberInput = styled.div`
display: flex;
flex-direction: column;
text-align: center;

> label {
    order: 0;
}

> input {
    order: 1;
    width: 4em;
}

label[for="lengthLower"] {
    order: 2;
}

input#freqHigh, > input#freqLow {
    width: 10em;
}
`