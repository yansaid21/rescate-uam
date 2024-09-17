import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

type IconsProps = {
    size: number,
    color: 'white' | 'black'
}

export const EyeIcon = ({ size, color }: IconsProps) => (
    <AntDesign name="eye" size={size} color={color} />
)

export const EyeOffIcon = ({ size, color }: IconsProps) => (
    <Ionicons name="eye-off" size={size} color={color} />
)
