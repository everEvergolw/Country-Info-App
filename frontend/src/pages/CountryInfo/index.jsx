import React from 'react';

import "./index.scss";

const country = JSON.parse(window.sessionStorage.getItem("info"));

const CountryInfo = () => {
    if (!country) {
        return <div>Loading...</div>;
    }

    return (
        <div className="country-details">
            {/* Top banner with flag and coat of arms */}
            <div className="banner">
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                <img src={country.coatOfArms.png} alt={`Coat of Arms of ${country.name.common}`} className="coat-of-arms" />
            </div>

            {/* Info section */}
            <div className="info-section">
                <h2>{country.name.common}</h2>
                <p>Official Name: {country.name.official}</p>
                <p>Alternate Spellings: {country.altSpellings.join(", ")}</p>
                <p>Capital: {country.capital[0]}</p>
                <p>Region: {country.region} - {country.subregion}</p>
                <p>Currency: {country.currencies.JPY.name} ({country.currencies.JPY.symbol})</p>
                <p>Language: {country.languages.jpn}</p>
                <p>Phone Code: {country.idd.root}{country.idd.suffixes[0]}</p>
                <p>Population: {country.population.toLocaleString()}</p>
                <p>Area: {country.area.toLocaleString()} km²</p>
                <p>Driving Side: {country.car.side}</p>
                <p>Timezones: {country.timezones.join(", ")}</p>

                <h3>Translations:</h3>
                <p>German: {country.translations.deu.common}</p>
                <p>Spanish: {country.translations.spa.common}</p>
                <p>Chinese: {country.translations.zho.common}</p>
                {/* ... add more translations if needed */}

                <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
            </div>
        </div>
    );
};

export default CountryInfo;
