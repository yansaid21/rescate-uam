import { Pressable, Text, StyleSheet }  from "react-native";

type CustomButtonProps = {
    text: string,
    customFun: () => void,
    color?: string;
    href: string
}

export default function CustomButton( { text, customFun, color = "blue", href  }: CustomButtonProps) {
    return (
        <Pressable
            onPress={customFun}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? `${color}AA` : color, 
                },
                styles.button
            ]}
        >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 19,
        alignItems: "center",
        justifyContent: "center",
        width: 212,
        height: 49
    },
    text: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontFamily: 'Fira Sans',
        fontSize: 18,
        textAlign: 'center',
        textShadowOffset: { width: 0, height: 4 },  // Equivale a 0px 4px en CSS
        textShadowRadius: 4,                        // Equivale a 4px de radio de difuminado
        textShadowColor: 'rgba(0, 0, 0, 0.25)', 
    },
});

