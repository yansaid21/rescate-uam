import React from 'react';
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const MySvgComponent = () => (
    <Svg
        width="500"
        height="400"
        viewBox="200 0 400 513"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <G clipPath="url(#clip0_657_1652)">
            <Path
                d="M236.021 448.693L214 382.239C214 382.239 238.222 406.461 238.222 426.335L233.874 380.376C233.874 380.376 246.295 397.145 245.053 422.608C243.811 448.072 236.021 448.693 236.021 448.693Z"
                fill="#B2B2B2"
            />
            <Path
                d="M579.726 479.359C579.763 523.074 493.061 509.627 386.916 509.719C280.772 509.81 195.381 523.405 195.343 479.691C195.305 435.976 281.976 426.394 388.121 426.302C494.265 426.21 579.688 435.644 579.726 479.359Z"
                fill="#B2B2B2"
            />
            <Path d="M790 509.693H0V511.693H790V509.693Z" fill="#3F3D56" />
            <Path
                d="M505.336 420.322H491.459L484.855 366.797H505.336V420.322Z"
                fill="#EC992D"
            />
            {/* Continúa con el resto de los paths */}
        </G>
        <Defs>
            <ClipPath id="clip0_657_1652">
                <Rect width="790" height="512.208" fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
);

export default MySvgComponent;
