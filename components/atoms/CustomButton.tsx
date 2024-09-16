import { Pressable, Text, StyleSheet }  from "react-native";
import { Link } from "expo-router";

type CustomButtonProps = {
    text: string,
    href: string
}

export default function CustomButton( { text,  href  }: CustomButtonProps) {
    return (
        <Link href={href} asChild 
            className="p-[10px] rounded-[19px] w-[212px] h-[49px] bg-[#0069A3]"
        >
            <Pressable
            >
                <Text className="text-lg font-bold text-center text-[#FFFFFF] ">{text}</Text>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    text: {
        textShadowOffset: { width: 0, height: 4 },  // Equivale a 0px 4px en CSS
        textShadowRadius: 4,                        // Equivale a 4px de radio de difuminado
        textShadowColor: 'rgba(0, 0, 0, 0.25)', 
    },
});

