import { Pressable, Text }  from "react-native";
import { Link } from "expo-router";
import * as Tokens from '../tokens';

type CustomButtonProps = {
    text: string,
    onPress?: () => void;
}

export default function CustomButton( { text, onPress  }: CustomButtonProps) {
    return (
        
            <Pressable
                onPress={onPress} 
                className={`${Tokens.ButtonStyle}`}
            >
                <Text className={`${Tokens.textButtonStyle}`}>{text}</Text>
            </Pressable>
    )
}

