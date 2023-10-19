import React, { useState, useEffect, useRef } from 'react';
import { getOrDefault } from '../../utils/helper';

/**
 * TranslationsDropdown Component.
 * This component displays a dropdown containing translations for the provided data.
 * 
 * @component
 * @param {Object} props - Props for the component.
 * @param {Object} props.translations - Translations object where each key is a language and the value is its translation.
 * @returns {React.ReactNode}
 */
const TranslationsDropdown = ({ translations }) => {

    const [isOpen, setIsOpen] = useState(false);
    const safeTranslations = getOrDefault(translations, {});
    const dropdownRef = useRef(null);

    /**
     * Handle clicks outside the dropdown to close it.
     */
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

    /**
     * Toggle the dropdown's visibility state.
     * 
     * @param {Event} event - The click event.
     */
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
