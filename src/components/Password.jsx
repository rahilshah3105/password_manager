import React, { useState, useEffect } from 'react'
import usePasswordGenerator from './PasswordGenerator';
import PasswordStrength from './Strength';
import PasswordStorage from './PasswordStorage';
import PasswordHistory from './PasswordHistory';

const Password = () => {

    const { password, errorMessage, generatePassword } = usePasswordGenerator();

    const [length, setLength] = useState(12);
    const [copyMessage, setCopyMessage] = useState(false);
    const [activeTab, setActiveTab] = useState('generator');
    const [passwordsGenerated, setPasswordsGenerated] = useState(0);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });
    const [checkboxData, setCheckboxData] = useState([
        { title: "Include Uppercase Letters", status: true, icon: "Aa" },
        { title: "Include Lowercase Letters", status: true, icon: "abc" },
        { title: "Include Numbers", status: true, icon: "123" },
        { title: "Include Special Characters", status: false, icon: "@#$" },
    ]);

    const checkClick = (i) => {
        const updateCheckbox = [...checkboxData];
        updateCheckbox[i].status = !updateCheckbox[i].status;
        setCheckboxData(updateCheckbox);
    };

    const handlCopy = () => {
        navigator.clipboard.writeText(password);
        setCopyMessage(true);
        setTimeout(() => {
            setCopyMessage(false);
        }, 2000);
    };

    const handleGenerate = () => {
        generatePassword(checkboxData, length);
        setPasswordsGenerated(prev => prev + 1);
    };

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const handleSelectAll = () => {
        const allSelected = checkboxData.every(cb => cb.status);
        setCheckboxData(checkboxData.map(cb => ({ ...cb, status: !allSelected })));
    };

    const handleQuickGenerate = (presetLength, presetName) => {
        const presets = {
            weak: [
                { title: "Include Uppercase Letters", status: false, icon: "Aa" },
                { title: "Include Lowercase Letters", status: true, icon: "abc" },
                { title: "Include Numbers", status: true, icon: "123" },
                { title: "Include Special Characters", status: false, icon: "@#$" },
            ],
            medium: [
                { title: "Include Uppercase Letters", status: true, icon: "Aa" },
                { title: "Include Lowercase Letters", status: true, icon: "abc" },
                { title: "Include Numbers", status: true, icon: "123" },
                { title: "Include Special Characters", status: false, icon: "@#$" },
            ],
            strong: [
                { title: "Include Uppercase Letters", status: true, icon: "Aa" },
                { title: "Include Lowercase Letters", status: true, icon: "abc" },
                { title: "Include Numbers", status: true, icon: "123" },
                { title: "Include Special Characters", status: true, icon: "@#$" },
            ],
        };
        setCheckboxData(presets[presetName]);
        setLength(presetLength);
        generatePassword(presets[presetName], presetLength);
        setPasswordsGenerated(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8 transition-colors">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                                PassGen
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Secure password generator & manager</p>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {darkMode ? (
                                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>
                            
                            {/* Tab Navigation */}
                            <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1 border border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => setActiveTab('generator')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeTab === 'generator'
                                            ? 'bg-emerald-500 text-white'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    Generate
                                </button>
                                <button
                                    onClick={() => setActiveTab('vault')}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeTab === 'vault'
                                            ? 'bg-emerald-500 text-white'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                >
                                    My Passwords
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {activeTab === 'generator' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Settings */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Stats Card */}
                            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm p-5 text-white">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium opacity-90">Passwords Generated</span>
                                    <svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div className="text-4xl font-bold">{passwordsGenerated}</div>
                                <p className="text-xs opacity-75 mt-1">Total sessions</p>
                            </div>

                            {/* Quick Presets */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Presets</h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleQuickGenerate(8, 'weak')}
                                        className="w-full text-left px-3 py-2.5 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Basic (8 chars)
                                    </button>
                                    <button
                                        onClick={() => handleQuickGenerate(12, 'medium')}
                                        className="w-full text-left px-3 py-2.5 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Standard (12 chars)
                                    </button>
                                    <button
                                        onClick={() => handleQuickGenerate(16, 'strong')}
                                        className="w-full text-left px-3 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Secure (16 chars)
                                    </button>
                                </div>
                            </div>

                            {/* Length Control */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Length
                                    </label>
                                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{length}</span>
                                </div>
                                <input
                                    type="range"
                                    min={6}
                                    max={32}
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                    className="range-slider w-full"
                                    style={{ '--value': `${((length - 6) / (32 - 6)) * 100}%` }}
                                />
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    <span>6</span>
                                    <span>32</span>
                                </div>
                            </div>

                            {/* Character Options */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Include</h3>
                                <div className="space-y-3">
                                    {checkboxData.map((checkbox, index) => (
                                        <label
                                            key={index}
                                            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={checkbox.status}
                                                    onChange={() => checkClick(index)}
                                                    className="custom-checkbox"
                                                />
                                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                                                    {checkbox.title}
                                                </span>
                                            </div>
                                            <span className="text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                {checkbox.icon}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Result */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Password Output */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <label className="text-sm font-semibold text-gray-900 dark:text-white mb-3 block">
                                    Your Password
                                </label>
                                
                                {password ? (
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-2 border-emerald-500 rounded-lg font-mono text-lg text-gray-900 dark:text-white break-all">
                                                {password}
                                            </div>
                                            <button
                                                onClick={handlCopy}
                                                className={`absolute -top-2 -right-2 px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-md ${
                                                    copyMessage
                                                        ? 'bg-emerald-600 text-white'
                                                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600'
                                                }`}
                                            >
                                                {copyMessage ? '✓ Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                        <PasswordStrength password={password} />
                                    </div>
                                ) : (
                                    <div className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            Click the button below to generate a password
                                        </p>
                                    </div>
                                )}

                                {errorMessage && (
                                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
                                        <span className="text-red-600 dark:text-red-400 text-sm">⚠</span>
                                        <span className="text-red-800 dark:text-red-300 text-sm">{errorMessage}</span>
                                    </div>
                                )}

                                <button
                                    onClick={handleGenerate}
                                    className="w-full mt-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                                >
                                    Generate New Password
                                </button>
                            </div>

                            {/* Password History */}
                            <PasswordHistory currentPassword={password} />

                            {/* Info Card */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-5">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">💡 Pro Tips</h3>
                                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                                        <span>Aim for 12+ characters minimum</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                                        <span>Enable all character types for maximum security</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                                        <span>Use unique passwords for each account</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <PasswordStorage currentPassword={password} />
                )}
            </div>
        </div>
    )
}

export default Password
