import { useState } from "react";

const usePasswordGenerator = () => {
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const generatePassword = (checkboxData, length) => {
        let characters = "", generatePassword = "";
        const selectedCheckbox = checkboxData.filter(checkbox => checkbox.status);

        if (selectedCheckbox.length === 0) {
            setErrorMessage("Please select atleast one option");
            setPassword("");
            return;
        }

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
    };

    return {
        password,
        errorMessage,
        generatePassword
    }
};

export default usePasswordGenerator;