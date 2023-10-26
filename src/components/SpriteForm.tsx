import React, { useState } from 'react';
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
        <div>
            <input type="file" id="fileInput" accept="image/*" onChange={handleFileChange} required />
            <input
                type="number"
                value={frameWidth}
                onChange={(e) => setFrameWidth(Number(e.target.value))}
                placeholder="Sprite Width"
            />
            <input
                type="number"
                value={frameHeight}
                onChange={(e) => setFrameHeight(Number(e.target.value))}
                placeholder="Sprite Height"
            />
            <input
                type="range"
                value={currentAnimationNumber}
                min={0}
                max={numberOfAnimations - 1}
                onChange={(e) => setCurrentAnimationNumber(Number(e.target.value))}
                placeholder="Sprite #"
            />
        </div>
    );
};