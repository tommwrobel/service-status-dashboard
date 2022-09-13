import { useState } from "react";

const useToggle = (initialState?: boolean) => {

    const [toggleState, setToggleState] = useState(!!initialState)

    const toggle = () => setToggleState(state => !state)

    return [toggleState, toggle];
}

export default useToggle;
