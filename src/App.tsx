import { SpriteForm } from './components/SpriteForm';
import SpriteDisplay from './components/SpriteDisplay';
import AnimationDefinitions from './components/AnimationDefinitions';
import { useUserInterfaceContext } from './context/UserInterfaceContext';

function App() {
  const {currentAnimationNumber} = useUserInterfaceContext();

    return (
        <div className="App flex flex-row">
          <div>
            <SpriteForm />
            <SpriteDisplay scale={5} currentAnimationNumber={currentAnimationNumber}/>
          </div>
            <AnimationDefinitions />
        </div>
    );
}

export default App;