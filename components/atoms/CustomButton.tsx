import { Pressable, Text }  from "react-native";
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
                <Text className="text-lg font-bold text-center text-[#FFFFFF] text-shadow-custom">{text}</Text>
            </Pressable>
        </Link>
    )
}

