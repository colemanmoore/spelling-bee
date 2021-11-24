export default function MessageBoard({ message }) {

    const styles = {
        width: '100%',
        textAlign: 'center',
        marginTop: '1em'
    }

    return (
        <div style={styles}>{message ? message : ''}</div>
    )
}