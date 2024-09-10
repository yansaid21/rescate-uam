import AntDesign from '@expo/vector-icons/AntDesign';

type IconsProps = {
    size: number,
    color: 'white' | 'black'
}

export const EyeIcon = ({ size, color }: IconsProps) => (
    <AntDesign name="eye" size={size} color={color} />
)
