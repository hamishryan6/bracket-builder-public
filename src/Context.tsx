import { createContext, useContext } from "react";
import { modalStateContext } from "./types";

const modalContext = createContext<modalStateContext | undefined>(undefined)

export const useModalContext = () => {
    const modalState = useContext(modalContext)

    if (modalState === undefined) { throw new Error('Context is undefined') }
    else { return modalState }
}

export default modalContext