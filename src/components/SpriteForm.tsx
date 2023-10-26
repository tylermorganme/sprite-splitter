import React from 'react';
import { useUserInterfaceContext } from '../context/UserInterfaceContext';

export const SpriteForm: React.FC = () => {
    const { frameWidth, setFrameWidth, frameHeight,
        setFrameHeight,
        currentAnimationNumber,
        setCurrentAnimationNumber,
        numberOfAnimations,
        setSpriteUrl,
    } = useUserInterfaceContext()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setSpriteUrl(reader.result as string);
            };
        }
    };

    return (
        <div className="w-full max-w-md bg-red-400 flex flex-col p-2 align">
            <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} required />
            <input
                className="m-2 max-w-[60px] p-1"
                type="number"

                value={frameWidth}
                onChange={(e) => setFrameWidth(Number(e.target.value))}
                placeholder="Sprite Width"
            />
            <input
                className="m-2 max-w-[60px] p-1"
                type="number"
                value={frameHeight}

                onChange={(e) => setFrameHeight(Number(e.target.value))}
                placeholder="Sprite Height"
            />
            <div className="flex flex-row">
                <input
                    className="m-2 max-w-xs grow"
                    type="range"
                    value={currentAnimationNumber}
                    min={0}
                    max={numberOfAnimations - 1}
                    onChange={(e) => setCurrentAnimationNumber(Number(e.target.value))}
                    placeholder="Sprite #"
                />
                <div className="w-2">{currentAnimationNumber}</div>
            </div>
        </div>
    );
};