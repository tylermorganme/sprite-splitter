import React, { useState } from 'react';
import { SpriteForm } from './components/SpriteForm';
import SpriteDisplay from './components/SpriteDisplay';

function App() {
    return (
        <div className="App">
            <SpriteForm />
            <SpriteDisplay scale={5} />
        </div>
    );
}

export default App;