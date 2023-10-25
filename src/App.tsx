import React, { useState } from 'react';
import { SpriteForm } from './components/SpriteForm';
import SpriteDisplay from './components/SpriteDisplay';

function App() {
    const [spriteUrl, setSpriteUrl] = useState<string | null>(null);

    const handleUpload = (file: File, width: number, height: number) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSpriteUrl(reader.result as string);
        };
    };

    return (
        <div className="App">
            <SpriteForm onUpload={handleUpload} />
            {spriteUrl && (
                <SpriteDisplay
                    spriteUrl={spriteUrl}
                    scale={5}
                />
            )}
        </div>
    );
}

export default App;