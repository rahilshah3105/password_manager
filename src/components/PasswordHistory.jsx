import React, { useState, useEffect } from 'react';

const PasswordHistory = ({ currentPassword }) => {
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('passwordHistory');
        if (stored) {
            setHistory(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        if (currentPassword && currentPassword.length > 0) {
            const newEntry = {
                password: currentPassword,
                timestamp: new Date().toISOString(),
                id: Date.now()
            };
            
            const updatedHistory = [newEntry, ...history].slice(0, 15);
            setHistory(updatedHistory);
            localStorage.setItem('passwordHistory', JSON.stringify(updatedHistory));
        }
    }, [currentPassword]);

    const handleCopy = (password) => {
        navigator.clipboard.writeText(password);
    };

    const clearHistory = () => {
        if (window.confirm('Clear all password history?')) {
            setHistory([]);
            localStorage.removeItem('passwordHistory');
        }
    };

    if (history.length === 0) return null;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-3">
                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center gap-2 text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                    <span className={`text-sm transform transition-transform ${showHistory ? 'rotate-90' : ''}`}>▶</span>
                    <span className="font-semibold text-sm">History ({history.length})</span>
                </button>
                {showHistory && (
                    <button
                        onClick={clearHistory}
                        className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                    >
                        Clear
                    </button>
                )}
            </div>

            {showHistory && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    {history.map((entry) => (
                        <div
                            key={entry.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors group border border-gray-200 dark:border-gray-600"
                        >
                            <div className="flex-1 min-w-0 mr-3">
                                <p className="font-mono text-sm text-gray-900 dark:text-white truncate">{entry.password}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {new Date(entry.timestamp).toLocaleString()}
                                </p>
                            </div>
                            <button
                                onClick={() => handleCopy(entry.password)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                Copy
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PasswordHistory;
