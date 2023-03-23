import { Text, StyleSheet } from 'react-native';

const Test = () => {
    return (
        <Text style={styles.text}>
            Ramon's App
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
        textAlign: 'center'
    }
});

export default Test;