import { createContext, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");
    const [error,setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Ref to track timeouts for cleanup
    const timeoutsRef = useRef([]);

    const delayPara = (index, nextWord) => {
        const timeoutId = setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
        
        // Store timeout ID for cleanup
        timeoutsRef.current.push(timeoutId);
    }

    // Cleanup timeouts on unmount or when starting new message
    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
            timeoutsRef.current = [];
        };
    }, []);

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setError(null);
        setResultData("");
        setIsProcessing(false);
    }


    const onSent = async (prompt) => {
        // Prevent multiple simultaneous requests
        if (isProcessing) {
            return;
        }

        try {
            setIsProcessing(true);
            
            // Clear any existing timeouts
            timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
            timeoutsRef.current = [];
            
            setResultData("");
            setError(null);
            setLoading(true);
            setShowResult(true);
            
            // Clear input immediately to prevent multiple submissions
            setInput("");
            
            let response;
            if(prompt !== undefined){
                response = await run(prompt);
                setRecentPrompt(prompt);
            } else {
                setRecentPrompt(input);
                response = await run(input);
            }

            // Process response for formatting - keep markdown syntax for TextRenderer
            // Convert single * to line breaks, but preserve ** for bold formatting
            let formattedResponse = response.replace(/(?<!\*)\*(?!\*)/g, '\n');
            
            // Start typing animation
            let newResponseArray = formattedResponse.split(" ");
            for(let i = 0; i < newResponseArray.length; i++){
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ");
            }
            
            setLoading(false);
            setIsProcessing(false);
            
        } catch (error) {
            console.error("API Error:", error);
            setError(error.message || "Failed to get response. Please try again.");
            setLoading(false);
            setIsProcessing(false);
        }
    }

    
    const contextValue = {
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        error
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ContextProvider }