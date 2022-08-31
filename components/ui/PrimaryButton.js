import { View, Text, Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const PrimaryButton = ({ children, onPress }) => {
    return (
        <View style={styles.buttonOutContainer}>
            <Pressable 
            onPress={onPress} android_ripple={{ color: '#640233' }} 
            style={({pressed}) => pressed ? [styles.buttonInContainer, styles.pressed]: styles.buttonInContainer}>
                <Text style={styles.buttonText}>
                    {children}
                </Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOutContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
    },
    pressed: {
        opacity: 0.75,
    }
});