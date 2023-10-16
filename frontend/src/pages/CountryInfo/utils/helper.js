// helper.js

export const determineZoomLevel = (area) => {
    if (area > 8000000) return 3; // 超大国家
    if (area > 1000000 && area <= 8000000) return 4; // 大国家
    if (area > 300000 && area <= 1000000) return 5; // 中等国家
    if (area > 50000 && area <= 300000) return 6; // 较小的国家
    return 7; // 小国家
};



export const getOrDefault = (value, defaultValue = 'N/A') => {
    return value ? value : defaultValue;
};

export const getLatestGini = (giniObj) => {
    if (!giniObj || Object.keys(giniObj).length === 0 || giniObj === 'N/A') return 'N/A';

    const latestYear = Math.max(...Object.keys(giniObj).map(Number));

    return {
        year: latestYear,
        value: giniObj[latestYear]
    };
};

export const getCurrency = (currencies) => {
    if (!currencies || Object.keys(currencies).length === 0 || currencies === 'N/A') return 'N/A';

    const currency = Object.keys(currencies);
    if (currency.length > 0) {
        return `${currencies[currency[0]].name} (${currencies[currency[0]].symbol})`
    } else {
        return 'No currency';
    }
};
