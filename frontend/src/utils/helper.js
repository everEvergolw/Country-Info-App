// helper.js

/**
 * Determine the zoom level for a country based on its area.
 * 
 * @param {number} area - Area of the country.
 * @returns {number} Zoom level.
 */
export const determineZoomLevel = (area) => {
    if (area > 8000000) return 3; // Very large countries
    if (area > 1000000 && area <= 8000000) return 4; // Large countries
    if (area > 300000 && area <= 1000000) return 5; // Medium-sized countries
    if (area > 50000 && area <= 300000) return 6; // Smaller countries
    return 7; // Small countries
};

/**
 * Get the provided value or return a default value.
 * 
 * @param {*} value - Input value.
 * @param {*} defaultValue - Default value to return if the input is not set.
 * @returns {*} The input value or the default value.
 */
export const getOrDefault = (value, defaultValue = 'N/A') => {
    return value ? value : defaultValue;
};

/**
 * Get the latest GINI coefficient from a given GINI object.
 * 
 * @param {Object} giniObj - An object with years as keys and GINI coefficients as values.
 * @returns {Object} An object containing the year and its corresponding GINI value.
 */
export const getLatestGini = (giniObj) => {
    if (!giniObj || Object.keys(giniObj).length === 0 || giniObj === 'N/A') return 'N/A';

    const latestYear = Math.max(...Object.keys(giniObj).map(Number));

    return {
        year: latestYear,
        value: giniObj[latestYear]
    };
};

/**
 * Extracts the name and symbol of the currency from a given currencies object.
 * 
 * @param {Object} currencies - An object where each key represents a currency and the value is its details.
 * @returns {string} The name and symbol of the currency or a default string if not found.
 */
export const getCurrency = (currencies) => {
    if (!currencies || Object.keys(currencies).length === 0 || currencies === 'N/A') return 'N/A';

    const currency = Object.keys(currencies);
    if (currency.length > 0) {
        return `${currencies[currency[0]].name} (${currencies[currency[0]].symbol})`
    } else {
        return 'No currency';
    }
};
