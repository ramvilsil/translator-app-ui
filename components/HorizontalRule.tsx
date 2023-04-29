import { View, StyleSheet } from 'react-native';

const HorizontalRule = () => {
    return <View style={styles.hr} />;
};

const styles = StyleSheet.create({
    hr: {
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
        marginVertical: 20,
        marginHorizontal: 10
    },
});

export default HorizontalRule;