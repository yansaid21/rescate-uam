import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type IconsProps = {
    size: number,
    color: string
}

export const EyeIcon = ({ size, color }: IconsProps) => (
    <AntDesign name="eye" size={size} color={color} />
)

export const EyeOffIcon = ({ size, color }: IconsProps) => (
    <Ionicons name="eye-off" size={size} color={color} />
)

export const UserIcon = ({ size, color }: IconsProps) => (
    <AntDesign name="user" size={size} color={color} />
)

export const NextIcon = ({ size, color }: IconsProps) => (
    <MaterialIcons name="navigate-next" size={size} color={color} />
)

export const ProfileIcon = ({ size, color }: IconsProps) => (
    <MaterialIcons name="account-circle" size={size} color={color} />
)

export const PencilIcon = ({ size, color }: IconsProps) => (
    <MaterialCommunityIcons name="pencil" size={size} color={color} />
)

export const KeyIcon = ({ size, color }: IconsProps) => (
    <Ionicons name="key" size={size} color={color} />
)
