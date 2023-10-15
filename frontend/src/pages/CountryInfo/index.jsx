import React, { useState } from 'react';

import "./index.scss";

const country = JSON.parse(window.sessionStorage.getItem("info"));
console.log(country)






const CountryInfo = () => {

    const [showMore, setShowMore] = useState(false)
    const [showAll, setShowAll] =   useState(false);



    if (!country) {
        return <div>Loading...</div>;
    }

    const getOrDefault = (value, defaultValue = 'N/A') => {
        return value ? value : defaultValue;
    };
    
    const ExpandableList = ({ title, items = [], maxVisibleItems = 3 }) => {
        const [showAll, setShowAll] = React.useState(false);
    
        const getAllItems = (AllItems) => {
            if (!AllItems || !Array.isArray(AllItems) || AllItems.length === 0) {
                return 'N/A';
            }
        
            if (AllItems.length <= maxVisibleItems) {
                return AllItems.join(", ");
            }
        
            if (showAll) {
                return AllItems.join(", ");
            } else {
                return `${AllItems.slice(0, maxVisibleItems).join(", ")}...`;
            }
        };
        
        
    
        return (
          <div className="row">
            <p className="title">{title}:</p>
            <p>
              {getAllItems(items)}
              {items.length > maxVisibleItems && (
                showAll ? 
                (<span onClick={() => setShowAll(false)} style={{cursor: 'pointer', color: 'blue'}}> Less</span>) :
                (<span onClick={() => setShowAll(true)} style={{cursor: 'pointer', color: 'blue'}}> More</span>)
              )}
            </p>
          </div>
        );
    };
    
    const getLatestGini = (giniObj) => {
        if (!giniObj || Object.keys(giniObj).length === 0 || giniObj === 'N/A') return 'N/A';
    
        const latestYear = Math.max(...Object.keys(giniObj).map(Number));
    
        return {
          year: latestYear,
          value: giniObj[latestYear]
        };
    }; 
    
    const getCurrency = (currencies) => {
        if (!currencies || Object.keys(currencies).length === 0 || currencies === 'N/A') return 'N/A';
    
        const currency = Object.keys(currencies);
        if (currency.length > 0) {
            return `${currencies[currency[0]].name} (${currencies[currency[0]].symbol})`
        } else {
            return 'No currency';
        }
    }
    


 
      

      const giniData = getLatestGini(country.gini);







    return (
        <div className="country-details">
        {/* Top banner with flag and coat of arms */}
        <div className="banner">
            <img src={getOrDefault(country.flags.png)} className="flag" alt={`Flag of ${getOrDefault(country.name.common)}`} />
            <img src={getOrDefault(country.coatOfArms.png)} className="coat-of-arms" alt={`Coat of Arms of ${getOrDefault(country.name.common)}`} />
        </div>
    
        {/* Official Information */}
        <div className="info-section official-info">
            <h2>Official Information</h2>
            <div className="row">
                <p className="title">Official Name:</p>
                <p>{getOrDefault(country.name.official)}</p>
            </div>
            <div className="row">
                <p className="title">Local Name:</p>
                <p>{getOrDefault(country.name.common)}</p>
                <p className="title">Official:</p>
                <p>{getOrDefault(country.name.official)}</p>
                <p className="title">Common:</p>
                <p>{getOrDefault(country.name.common)}</p>
            </div>
        </div>
    
        {/* Geographical Information */}
        <div className="info-section geographical-info">
            <h2>Geographical Information</h2>
            <div className="row">
                <p className="title">Capital:</p>
                <p>{getOrDefault(country.capital[0])}</p>
                <p className="title">Region:</p>
                <p>{getOrDefault(country.region)}</p>
                <p className="title">Subregion:</p>
                <p>{getOrDefault(country.subregion)}</p>
            </div>
            <div className="row">
                <p className="title">Latitude, Longitude:</p>
                <p>{getOrDefault(country.latlng.join(', '))}</p>
                <p className="title">Capital Info:</p>
                <p>{getOrDefault(country.capitalInfo && country.capitalInfo.latlng.join(', '))}</p>
            </div>
    
            <ExpandableList title="Timezones" items={country.timezones} />
            <div className="row">
                <p className="title">Start of week: </p>
                <p>{getOrDefault(country.startOfWeek)}</p>
                <p className="title">Area: </p>
                <p>{getOrDefault(country.area && country.area.toLocaleString())} km²</p>
            </div>
    
            <ExpandableList title="Neighboring Countries:" items={country.borders} />
        </div>
    
        {/* Links and Maps */}
        <div className="info-section links-maps">
            <h2>Links and Maps</h2>
            <a href={getOrDefault(country.maps.googleMaps)} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
            <a href={getOrDefault(country.maps.openStreetMaps)} target="_blank" rel="noopener noreferrer">View on OpenStreetMaps</a>
        </div>
    
        {/* Economic and Political Information */}
        <div className="info-section economic-political-info">
            <h2>Economic and Political Information</h2>
            <div className="row">
                <p className="title">Currency:</p>
                <p>{getCurrency(country.currencies)}</p>
            </div>   
            <div className="row">
                <p className="title">Independence:</p>
                <p>{getOrDefault(country.independent ? 'Yes' : 'No')}</p>
                <p className="title">Status:</p>
                <p>{getOrDefault(country.status)}</p>
                <p className="title">UN Member:</p>
                <p>{getOrDefault(country.unMember ? 'Yes' : 'No')}</p>
            </div>   
            <div className="row">
                <p className="title">Population:</p>
                <p>{getOrDefault(country.population && country.population.toLocaleString())}</p>
                <p className="title">{`GINI Index (${giniData.year}):`}</p>
                <p>{getOrDefault(giniData.value)}</p>
                <p className="title">FIFA Code:</p>
                <p>{getOrDefault(country.fifa)}</p>
            </div>
        </div>
    
        {/* Transport and Communication */}
        <div className="info-section transport-comm-info">
            <h2>Transport and Communication</h2>
            <div className="row">
                <p className="title">Phone Code:</p>
                <p>{getOrDefault(country.idd.root)}{getOrDefault(country.idd.suffixes[0])}</p>
                <p className="title">Driving Side:</p>
                <p>{getOrDefault(country.car.side)}</p>
                <p className="title">Car Signs:</p>
                <p>{getOrDefault(country.car.signs[0])}</p>
            </div>
        </div>
    

        {/* License Plate info is missing in provided JSON */}
            {/* <p>License Plate: {country.plate}</p> */}
        
            {showMore && (
  <div>
    {/* Additional Details */}
    <div className="info-section additional-details">
      <h2>Additional Details</h2>

      <div className="row">
        <p className="title">Languages:</p>
        <p>{getOrDefault(Object.values(country.languages).join(', '))}</p>
      </div>       

      <div className="row">
        <p className="title">Demonyms: </p>
        <p>Male: {getOrDefault(country.demonyms.eng.m)}, Female: {getOrDefault(country.demonyms.eng.f)}</p>
      </div>

      <p>Translations: {getOrDefault(Object.entries(country.translations).map(([key, val]) => `${key}: ${val.common}`).join(', '))}</p>

      <ExpandableList title="Alternate Spellings" items={getOrDefault(country.altSpellings, [])} />

      <div className="row">
        <p className="title">TLD: </p>
        <p>{getOrDefault(country.tld.join(', '))}</p>
      </div>       

      <div className="row">
        <p className="title">CCA2:</p>
        <p>{getOrDefault(country.cca2)}</p>

        <p className="title">CCN3:</p>
        <p>{getOrDefault(country.ccn3)}</p>

        <p className="title">CCA3:</p>
        <p>{getOrDefault(country.cca3)}</p>

        <p className="title">CIOC:</p>
        <p>{getOrDefault(country.cioc)}</p>
      </div>
    </div>

    {/* Postal Information */}
    <div className="info-section postal-info">
      <h2>Postal Information</h2>
      <div className="row">
        <p className="title">Format:</p>
        <p>{getOrDefault(country.postalCode.format)}</p> 
        <p className="title">Regex:</p>
        <p>{getOrDefault(country.postalCode.regex)}</p>
      </div>    
    </div>

    <a className="showMoreLess" onClick={() => setShowMore(false)}>Show less...</a>
  </div>
)}

{!showMore && <a className="showMoreLess" onClick={() => setShowMore(true)}>Show more...</a>}
</div>

    
    );






};

export default CountryInfo;
