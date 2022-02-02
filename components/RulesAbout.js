import { ABOUT_COPY, RULES_COPY } from 'constants/constants'
import Sidebar from 'components/Sidebar'
import { useState } from 'react'

export default function RulesAbout() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Sidebar active={isOpen} percentWidth={75} handleClose={() => setIsOpen(false)}>
            <h3>Rules</h3>
            <p>{RULES_COPY}</p>
            <h3>About</h3>
            <p>{ABOUT_COPY}</p>
        </Sidebar>
    )
}