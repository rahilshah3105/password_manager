import { useState } from "react";
import logger from "../utils/logger";

const usePasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const generatePassword = (checkboxData, length) => {
        let characters = "", generatePassword = "";
        const selectedCheckbox = checkboxData.filter(checkbox => checkbox.status);

        if (selectedCheckbox.length === 0) {
            logger.warn("Password generation failed: No options selected");
            setErrorMessage("Please select atleast one option");
            setPassword("");
            return;
        }

        logger.debug("Generating password with options:", { selectedOptions: selectedCheckbox.map(c => c.title), length });

        selectedCheckbox.forEach(check => {
            switch (check.title) {
                case "Include Uppercase Letters":
                    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    break;
                case "Include Lowercase Letters":
                    characters += "abcdefghijklmnopqrstuvwxyz";
                    break;
                case "Include Special Characters":
                    characters += "!@#$%^&*()_-+={[}]|:;<,>.?/+";
                    break;
                case "Include Numbers":
                    characters += "0123456789";
                    break;
            };
        });

        for (let index = 0; index < length; index++) {
            const randomPassword = Math.floor(Math.random() * characters.length);
            generatePassword += characters[randomPassword];
        };

        setPassword(generatePassword);
        setErrorMessage("");
        logger.info("Password generated successfully", { length: generatePassword.length });
    };

    return {
        password,
        errorMessage,
        generatePassword
    }
};

export default usePasswordGenerator;