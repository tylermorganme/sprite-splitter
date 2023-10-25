import React, { useState } from 'react';
import { useUserInterfaceContext } from '../context/UserInterfaceContext';

type Props = {
    onUpload: (file: File, width: number, height: number) => void;
};

export const SpriteForm: React.FC<Props> = ({ onUpload }) => {
    const { frameWidth, setFrameWidth, frameHeight,
        setFrameHeight, frameNumber, setFrameNumber } = useUserInterfaceContext()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (file) {
            onUpload(file, frameWidth, frameHeight);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" id="fileInput" accept="image/*" required />
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
                value={frameNumber}
                min={0}
                max={12}
                onChange={(e) => setFrameNumber(Number(e.target.value))}
                placeholder="Sprite #"
            />
            <button type="submit">Upload & Preview</button>
        </form>
    );
};