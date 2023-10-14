import React, { useState } from 'react';

import "./index.scss";

const country = JSON.parse(window.sessionStorage.getItem("info"));
console.log(country)

const CountryInfo = () => {
    const [showMore, setShowMore] = useState(false)

    if (!country) {
        return <div>Loading...</div>;
    }

    const getCurrency = (currencies) => {
        const currency = Object.keys(currencies)
        if (currency.length > 0) {
            return `${currencies[currency[0]].name} (${currencies[currency[0]].symbol})`
        } else {
            return 'No currency'
        }
    }

    return (
        <div className="country-details">
            {/* Top banner with flag and coat of arms */}
            <div className="banner">
                <img src={country.flags.png} className="flag" alt={`Flag of ${country.name.common}`} />
                <img src={country.coatOfArms.png} alt={`Coat of Arms of ${country.name.common}`} className="coat-of-arms" />
            </div>

            {/* Info section */}
            <div className="info-section">
                <h2>{country.name.common}</h2>
                <div className="row">
                    <p className="title">Official Name:</p>
                    <p>{country.name.official}</p>
                </div>
                <div className="row">
                    <p className="title">Alternate Spellings:</p>
                    <p>{country.altSpellings.join(", ")}</p>
                </div>
                <div className="Box">
                    <div className="row">
                        <p className="title">Capital:</p>
                        <p>{country.capital[0]}</p>
                    </div>
                    <p>Region: {country.region} - {country.subregion}</p>
                    <p>Currency: {getCurrency(country.currencies)}</p>
                </div>
                <p>Language: {country.languages.jpn}</p>
                <p>Phone Code: {country.idd.root}{country.idd.suffixes[0]}</p>
                <p>Population: {country.population.toLocaleString()}</p>
                <p>Area: {country.area.toLocaleString()} km²</p>
                <p>Driving Side: {country.car.side}</p>
                {!showMore && <a className="showMoreLess" onClick={() => setShowMore(true)}>Show more...</a>}
                {showMore && (<>
                    <p>Timezones: {country.timezones.join(", ")}</p>
                    <div className="row">
                        <p className="title">altSpellings:</p>
                        <ul>
                            {country.altSpellings.map((spell, index) => <li key={index}><p>{spell}</p></li>)}
                        </ul>
                    </div>
                    <h3>Translations:</h3>
                    {country.translations?.deu && (
                        <div className="row">
                            <p className="title">German:</p>    
                            <p>{country.translations.deu.common}</p>
                        </div>
                        
                    )}
                    {country.translations?.spa && <p>Spanish: {country.translations.spa.common}</p>}
                    {country.translations?.zho && <p>Chinese: {country.translations.zho.common}</p>}
                    {/* ... add more translations if needed */}

                    <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                    <a className="showMoreLess" onClick={() => setShowMore(false)}>Show less...</a>
                </>)
                }
            </div>
        </div>
    );
};

export default CountryInfo;
