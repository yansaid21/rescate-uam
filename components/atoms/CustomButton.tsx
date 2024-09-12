import { Pressable, Text, StyleSheet }  from "react-native";
import { Link } from "expo-router";

type CustomButtonProps = {
    text: string,
    href: string
}

export default function CustomButton( { text,  href  }: CustomButtonProps) {
    return (
        <Link href={href} asChild 
            style={[styles.button,]}
        >
            <Pressable
            >
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 19,
        alignItems: "center",
        justifyContent: "center",
        width: 212,
        height: 49,
        backgroundColor: '#0069A3'
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

