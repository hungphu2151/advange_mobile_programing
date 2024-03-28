import { createContext, useState } from "react";

export const ModalContext = createContext({
    comments: [],
    isVisible: false,
    handleToggle: () => {},
    handleSetComments: (listComment) => {}
});

export default function ModalContextProvider({ children }) {
    const [isVisible, setIsVisible] = useState(false);

    const [comments, setComments] = useState([]);

    function handleToggle() {
        setIsVisible((prevIsVisible) => !prevIsVisible);
    }

    function handleSetComments(listComment) {
        setComments(listComment);
    }

    const value = {
        isVisible,
        handleToggle,
        comments,
        handleSetComments,
    };
    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    );
}
