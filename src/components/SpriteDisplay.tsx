import { useEffect, useState } from "react";
import { useUserInterfaceContext } from "../context/UserInterfaceContext";

interface SpriteDisplayProps {
    scale: number;
    currentAnimationNumber: number;
}

const SpriteDisplay: React.FC<SpriteDisplayProps> = ({scale, currentAnimationNumber}) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [frameCount, setFrameCount] = useState(0);

    const {
        frameWidth,
        frameHeight,
        setNumberOfAnimations,
        spriteUrl
    } = useUserInterfaceContext();

    useEffect(() => {
        if (spriteUrl !== undefined) {
            const img = new Image();
            img.src = spriteUrl;
            img.onload = () => {
                setFrameCount(Math.floor(img.width / frameWidth));
                setNumberOfAnimations(Math.floor(img.height /frameHeight));
            };
        }
    }, [spriteUrl, frameWidth, frameHeight]);

    useEffect(() => {
        if (frameCount <=0){
            return
        }
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [frameCount]);

    const animatedSpriteBGPosition = `${-currentFrame * frameWidth}px ${-currentAnimationNumber * frameHeight}px`;
    const spriteRowBGPosition = `0px ${-currentAnimationNumber * frameHeight}px`;

    return (
        <>
            <div
                style={{
                    width: `${frameWidth * frameCount}px`,
                    height: `${frameHeight}px`,
                    backgroundImage: `url(${spriteUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: spriteRowBGPosition,
                    transformOrigin: '0 0',
                }}
            />
            <div
                style={{
                    width: `${frameWidth}px`,
                    height: `${frameHeight}px`,
                    backgroundImage: `url(${spriteUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: animatedSpriteBGPosition,
                    transform: `scale(${scale})`,
                    transformOrigin: '0 0',
                }}
            />
        </>
    );
};

export default SpriteDisplay;