import { useEffect, useState } from "react";
import { useUserInterfaceContext } from "../context/UserInterfaceContext";

interface SpriteDisplayProps {
    spriteUrl: string;
    scale: number;
}

const SpriteDisplay: React.FC<SpriteDisplayProps> = ({ spriteUrl, scale }) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [frameCount, setFrameCount] = useState(0);
    const { frameWidth, frameHeight, frameNumber } = useUserInterfaceContext();

    useEffect(() => {
        const img = new Image();
        img.src = spriteUrl;
        img.onload = () => {
            setFrameCount(Math.floor(img.width / frameWidth));
        };
    }, [spriteUrl, frameWidth]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
        }, 100); // Adjust this duration for faster/slower animation

        return () => {
            clearInterval(interval);
        };
    }, [frameWidth, frameCount]);

    const animatedSpriteBGPosition = `${-currentFrame * frameWidth}px ${-frameNumber * frameHeight}px`;
    const spriteRowBGPosition = `0px ${-frameNumber * frameHeight}px`;

    return (
        <>
            <div
                style={{
                    width: `${frameWidth * frameCount}px`,
                    height: `${frameHeight}px`,
                    backgroundImage: `url(${spriteUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: spriteRowBGPosition,
                    // transform: `scale(${scale})`,
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