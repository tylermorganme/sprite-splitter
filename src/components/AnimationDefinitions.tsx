import { useCallback, useState } from "react";
import { useUserInterfaceContext } from "../context/UserInterfaceContext";
import SpriteDisplay from "./SpriteDisplay";

interface AnimationDefinition {
    name: string
    animationNumber: number;
    frameCount: number;
}

const AnimationDefinitions: React.FC = () => {
    const [animations, setAnimations] = useState<AnimationDefinition[]>([]);
    const { numberOfAnimations } = useUserInterfaceContext();

    // Handler to update a particular field for an animation definition by its name
    const handleInputChange = <T extends string | number>(index: number, field: keyof AnimationDefinition, value: T) => {
        setAnimations(prev => {
            const newValues = [...prev];
            const updatedAnimation = { ...newValues[index], [field]: value };
            newValues[index] = updatedAnimation;
            return newValues;
        });
    };
    const addNewAnimation = () => {
        setAnimations(prev => [...prev, {
            name: "",
            animationNumber: 0,
            frameCount: 0,
        }]);
    };

    const refreshAnimationDefinitions = () => {
        setAnimations(new Array(numberOfAnimations).fill({}));
    }

    return (
        <div className="flex flex-col">
            <button onClick={refreshAnimationDefinitions}>Refresh</button>
            {/* <div>
                <input type="text" placeholder="Enter animation name" id="newAnimationName" />
                <button onClick={() => {
                    addNewAnimation();
                }}>Add New Animation</button>
            </div> */}
            <ul className="pt-8">
                {animations.map((animation, i) => (
                    <li key={i} className="min-h-[150px] flex flex-row">
                        <div>
                            <div>
                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        value={animation.name}
                                        onChange={(e) => handleInputChange<string>(i, "name", e.target.value)}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Animation Number:
                                    <input
                                        type="number"
                                        value={animation.animationNumber}
                                        onChange={(e) => handleInputChange(i, "animationNumber", Number(e.target.value))}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Frame Count:
                                    <input
                                        type="number"
                                        value={animation.frameCount}
                                        onChange={(e) => handleInputChange(i, "frameCount", Number(e.target.value))}
                                    />
                                </label>
                            </div>
                        </div>
                        <SpriteDisplay scale={4} currentAnimationNumber={i} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnimationDefinitions;