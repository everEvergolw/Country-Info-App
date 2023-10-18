import React, { useState, useEffect, useRef } from 'react';

import { getOrDefault } from '../../utils/helper';

    
const TranslationsDropdown = ({ translations }) => {

    const [isOpen, setIsOpen] = useState(false);
    const safeTranslations = getOrDefault(translations, {});
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleButtonClick = (event) => {
        event.stopPropagation();  
        setIsOpen(!isOpen);
    };

    return (
        <div className="translations-dropdown" ref={dropdownRef}>
            <button onClick={handleButtonClick}>Translations</button>
            {isOpen && (
                <div className="dropdown-content">
                    {Object.entries(safeTranslations).map(([key, val]) => (
                        <div key={key} className="translation-item">
                            <span className="lang">{key}</span>: <span className="translation">{val.common}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TranslationsDropdown;
