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
        <section style={styles}>Please wait while we grab today's game...</section>
    )
}