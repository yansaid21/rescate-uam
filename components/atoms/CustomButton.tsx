import { Pressable, Text }  from "react-native";
import { Link } from "expo-router";

type CustomButtonProps = {
    text: string,
    onPress?: () => void;
}

export default function CustomButton( { text, onPress  }: CustomButtonProps) {
    return (
        
            <Pressable
                onPress={onPress} 
                className="p-[10px] rounded-[19px] w-[212px] h-[49px] bg-[#0069A3]"
            >
                <Text className="text-lg font-bold text-center text-[#FFFFFF] text-shadow-custom">{text}</Text>
            </Pressable>
    )
}

