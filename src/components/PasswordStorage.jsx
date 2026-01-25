import React, { useState, useEffect } from 'react';

const PasswordStorage = ({ currentPassword }) => {
    const [storedPasswords, setStoredPasswords] = useState([]);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showPassword, setShowPassword] = useState({});
    
    const [formData, setFormData] = useState({
        url: '',
        username: '',
        password: '',
        notes: ''
    });

    useEffect(() => {
        const stored = localStorage.getItem('storedPasswords');
        if (stored) {
            setStoredPasswords(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        if (storedPasswords.length > 0) {
            localStorage.setItem('storedPasswords', JSON.stringify(storedPasswords));
        }
    }, [storedPasswords]);

    useEffect(() => {
        if (currentPassword && isAddingNew) {
            setFormData(prev => ({ ...prev, password: currentPassword }));
        }
    }, [currentPassword]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.url || !formData.password) {
            alert('URL and Password are required!');
            return;
        }

        if (editingId !== null) {
            setStoredPasswords(prev => prev.map(item => 
                item.id === editingId 
                    ? { ...formData, id: editingId, createdAt: item.createdAt, updatedAt: new Date().toISOString() }
                    : item
            ));
            setEditingId(null);
        } else {
            const newPassword = {
                ...formData,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            setStoredPasswords(prev => [...prev, newPassword]);
        }

        setFormData({ url: '', username: '', password: '', notes: '' });
        setIsAddingNew(false);
    };

    const handleEdit = (item) => {
        setFormData({
            url: item.url,
            username: item.username,
            password: item.password,
            notes: item.notes || ''
        });
        setEditingId(item.id);
        setIsAddingNew(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this password?')) {
            setStoredPasswords(prev => prev.filter(item => item.id !== id));
            if (storedPasswords.length === 1) {
                localStorage.removeItem('storedPasswords');
            }
        }
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const togglePasswordVisibility = (id) => {
        setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(storedPasswords, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `passwords_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleImportJSON = (e) => {
        const file = e.target.files[0];
        if (file && file.name.endsWith('.json')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    if (Array.isArray(imported)) {
                        const merged = [...storedPasswords, ...imported];
                        setStoredPasswords(merged);
                        alert(`Successfully imported ${imported.length} passwords!`);
                    }
                } catch (error) {
                    alert('Invalid JSON file format!');
                }
            };
            reader.readAsText(file);
        }
        e.target.value = '';
    };

    const handleImportCSV = (e) => {
        const file = e.target.files[0];
        if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const text = event.target.result;
                    const lines = text.split('\n').filter(line => line.trim());
                    const imported = [];

                    // Skip header row
                    for (let i = 1; i < lines.length; i++) {
                        const line = lines[i].trim();
                        if (!line) continue;

                        // Handle CSV with different delimiters
                        const parts = line.split(',').map(part => 
                            part.replace(/^["']|["']$/g, '').trim()
                        );

                        if (parts.length >= 3) {
                            const entry = {
                                url: parts[0] || parts[1] || 'Unknown',
                                username: parts[1] || parts[2] || '',
                                password: parts[2] || parts[3] || '',
                                notes: parts[3] || '',
                                id: Date.now() + i,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString()
                            };
                            imported.push(entry);
                        }
                    }

                    if (imported.length > 0) {
                        const merged = [...storedPasswords, ...imported];
                        setStoredPasswords(merged);
                        alert(`Successfully imported ${imported.length} passwords from CSV!`);
                    } else {
                        alert('No valid password entries found in the CSV file.');
                    }
                } catch (error) {
                    alert('Error reading CSV file. Please check the format.');
                }
            };
            reader.readAsText(file);
        }
        e.target.value = '';
    };

    const exportToCSV = () => {
        const headers = ['URL', 'Username', 'Password', 'Notes'];
        const csvContent = [
            headers.join(','),
            ...storedPasswords.map(item => 
                [item.url, item.username, item.password, item.notes || '']
                    .map(field => `"${field}"`)
                    .join(',')
            )
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `passwords_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const filteredPasswords = storedPasswords.filter(item => 
        item.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Passwords</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{storedPasswords.length} passwords stored securely</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setIsAddingNew(!isAddingNew)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
                        >
                            {isAddingNew ? '✕ Cancel' : '+ New Password'}
                        </button>
                        
                        {/* Import Dropdown */}
                        <div className="relative group">
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm">
                                ↑ Import
                            </button>
                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                <div className="py-1">
                                    <label className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        Import CSV File
                                        <input
                                            type="file"
                                            accept=".csv"
                                            onChange={handleImportCSV}
                                            className="hidden"
                                        />
                                    </label>
                                    <label className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        Import JSON File
                                        <input
                                            type="file"
                                            accept=".json"
                                            onChange={handleImportJSON}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Export Dropdown */}
                        {storedPasswords.length > 0 && (
                            <div className="relative group">
                                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors text-sm font-medium shadow-sm">
                                    ↓ Export
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                    <div className="py-1">
                                        <button
                                            onClick={exportToCSV}
                                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-left text-sm text-gray-700 dark:text-gray-300"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Export as CSV
                                        </button>
                                        <button
                                            onClick={handleExport}
                                            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-left text-sm text-gray-700 dark:text-gray-300"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Export as JSON
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Import Instructions */}
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">📥 Import Browser Passwords</h4>
                    <p className="text-xs text-blue-800 dark:text-blue-300 mb-2">
                        Export passwords from your browser and import them here:
                    </p>
                    <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1 ml-4">
                        <li className="list-disc"><strong>Chrome:</strong> Settings → Passwords → ⋮ → Export passwords</li>
                        <li className="list-disc"><strong>Firefox:</strong> Passwords → ⋮ → Export Logins</li>
                        <li className="list-disc"><strong>Edge:</strong> Settings → Passwords → ⋮ → Export passwords</li>
                    </ul>
                    <p className="text-xs text-blue-600 mt-2 italic">
                        Supported formats: CSV, JSON
                    </p>
                </div>
            </div>

            {isAddingNew && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {editingId ? 'Edit Password' : 'Add New Password'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Website URL *</label>
                            <input
                                type="text"
                                name="url"
                                value={formData.url}
                                onChange={handleInputChange}
                                placeholder="https://example.com"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Username / Email</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="user@example.com"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Password *</label>
                            <input
                                type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter password"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">Notes (optional)</label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                                placeholder="Additional information"
                                rows="3"
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                        >
                            {editingId ? 'Update Password' : 'Save Password'}
                        </button>
                    </form>
                </div>
            )}

            {storedPasswords.length > 0 && (
                <div>
                    <input
                        type="text"
                        placeholder="🔍 Search passwords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
                    />
                </div>
            )}

            {filteredPasswords.length > 0 ? (
                <div className="grid gap-4">
                    {filteredPasswords.map(item => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-3">
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">{item.url}</h3>
                                        <button
                                            onClick={() => handleCopy(item.url)}
                                            className="text-gray-400 hover:text-emerald-600 transition-colors flex-shrink-0"
                                            title="Copy URL"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    {item.username && (
                                        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
                                            <span className="truncate">{item.username}</span>
                                            <button
                                                onClick={() => handleCopy(item.username)}
                                                className="text-gray-400 hover:text-emerald-600 transition-colors flex-shrink-0"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                            {showPassword[item.id] ? item.password : '••••••••••••'}
                                        </span>
                                        <button
                                            onClick={() => togglePasswordVisibility(item.id)}
                                            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                        >
                                            {showPassword[item.id] ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleCopy(item.password)}
                                            className="text-gray-400 hover:text-emerald-600 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                    {item.notes && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-gray-700 p-2 rounded">{item.notes}</p>
                                    )}
                                    
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                        Added {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                
                                <div className="flex gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="px-3 py-2 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : storedPasswords.length > 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    No passwords match your search
                </div>
            ) : (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400 font-medium mb-1">No passwords saved yet</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm">Click "New Password" to get started</p>
                </div>
            )}
        </div>
    );
};

export default PasswordStorage;
