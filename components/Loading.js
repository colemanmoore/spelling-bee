export default function Loading() {

  const styles = {
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  return (
    <section style={styles}>Please wait while we grab today's game...</section>
  );
}
