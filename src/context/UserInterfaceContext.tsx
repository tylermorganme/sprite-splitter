import React, { createContext, useContext, useState } from 'react';

interface UserInterfaceContextProps {
    frameWidth: number;
    setFrameWidth: React.Dispatch<React.SetStateAction<number>>;
    frameHeight: number;
    setFrameHeight: React.Dispatch<React.SetStateAction<number>>;
    frameNumber: number;
    setFrameNumber: React.Dispatch<React.SetStateAction<number>>;
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
    const [frameNumber, setFrameNumber] = useState(0);

    return (
        <UserInterfaceContext.Provider value={{ frameWidth: frameWidth, setFrameWidth: setFrameWidth, frameHeight: frameHeight, setFrameHeight: setFrameHeight, frameNumber: frameNumber, setFrameNumber: setFrameNumber }}>
            {children}
        </UserInterfaceContext.Provider>
    );
};

export { UserInterfaceProvider, useUserInterfaceContext };