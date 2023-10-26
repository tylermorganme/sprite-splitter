import React, { createContext, useContext, useState } from 'react';

interface UserInterfaceContextProps {
    frameWidth: number;
    setFrameWidth: React.Dispatch<React.SetStateAction<number>>;
    frameHeight: number;
    setFrameHeight: React.Dispatch<React.SetStateAction<number>>;
    currentAnimationNumber: number;
    setCurrentAnimationNumber: React.Dispatch<React.SetStateAction<number>>;
    numberOfAnimations: number;
    setNumberOfAnimations: React.Dispatch<React.SetStateAction<number>>;
    spriteUrl?: string;
    setSpriteUrl: React.Dispatch<React.SetStateAction<string | undefined>>
}

interface SpriteProviderProps {
    children: React.ReactNode;
}

const UserInterfaceContext = createContext<UserInterfaceContextProps | undefined>(undefined);

function useUserInterfaceContext(): UserInterfaceContextProps {
    const context = useContext(UserInterfaceContext);
    if (!context) {
        throw new Error("useUserInterfaceContext must be used within a UserInterfaceProvider");
    }
    return context;
}

const UserInterfaceProvider: React.FC<SpriteProviderProps> = ({ children }) => {
    const [frameWidth, setFrameWidth] = useState(32);
    const [frameHeight, setFrameHeight] = useState(32);
    const [currentAnimationNumber, setCurrentAnimationNumber] = useState(0);
    const [numberOfAnimations, setNumberOfAnimations] = useState(0);
    const [spriteUrl, setSpriteUrl] = useState<string>();

    return (
        <UserInterfaceContext.Provider value={{
            frameWidth,
            setFrameWidth,
            frameHeight,
            setFrameHeight,
            currentAnimationNumber,
            setCurrentAnimationNumber,
            numberOfAnimations,
            setNumberOfAnimations,
            spriteUrl,
            setSpriteUrl,
            }}>
            {children}
        </UserInterfaceContext.Provider>
    );
};

export { UserInterfaceProvider, useUserInterfaceContext };