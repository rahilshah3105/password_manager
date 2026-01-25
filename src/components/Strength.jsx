const PasswordStrength = ({ password = "" }) => {
    const getPasswordStrength = () => {
        if (!password || password.length < 1) {
            return null;
        }

        let score = 0;
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*()_\-+={\[}\]|:;<,>.?/+]/.test(password);

        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;
        if (password.length >= 20) score += 1;

        if (hasLower) score += 1;
        if (hasUpper) score += 1;
        if (hasNumber) score += 1;
        if (hasSpecial) score += 1;

        if (score <= 3) {
            return {
                label: "Weak",
                color: "text-red-700 dark:text-red-400",
                bg: "bg-red-100 dark:bg-red-900/30",
                border: "border-red-300 dark:border-red-700",
                bars: 1
            };
        } else if (score <= 5) {
            return {
                label: "Fair",
                color: "text-amber-700 dark:text-amber-400",
                bg: "bg-amber-100 dark:bg-amber-900/30",
                border: "border-amber-300 dark:border-amber-700",
                bars: 2
            };
        } else if (score <= 6) {
            return {
                label: "Good",
                color: "text-blue-700 dark:text-blue-400",
                bg: "bg-blue-100 dark:bg-blue-900/30",
                border: "border-blue-300 dark:border-blue-700",
                bars: 3
            };
        } else {
            return {
                label: "Strong",
                color: "text-emerald-700 dark:text-emerald-400",
                bg: "bg-emerald-100 dark:bg-emerald-900/30",
                border: "border-emerald-300 dark:border-emerald-700",
                bars: 4
            };
        }
    };

    const strength = getPasswordStrength();
    
    if (!strength) {
        return null;
    }

    return (
        <div className={`p-4 rounded-lg border ${strength.border} ${strength.bg}`}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Strength:</span>
                <span className={`text-sm font-bold ${strength.color}`}>
                    {strength.label}
                </span>
            </div>
            <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((bar) => (
                    <div
                        key={bar}
                        className={`h-1.5 flex-1 rounded-full ${
                            bar <= strength.bars ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PasswordStrength;