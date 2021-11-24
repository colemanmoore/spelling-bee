export default function Loading() {

    const styles = {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }

    return (
        <div style={styles}>Fetching today's game...</div>
    )
}