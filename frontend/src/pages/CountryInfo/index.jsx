import React, { useState  } from 'react';
import GoogleMapReact from 'google-map-react';
import ExpandableList from './components/ExpandableList';
import TranslationsDropdown from './components/TranslationsDropdown';
import { determineZoomLevel,  getOrDefault, getLatestGini, getCurrency } from './utils/helper';



import "./index.scss";

const country = JSON.parse(window.sessionStorage.getItem("info"));
console.log(country)

const API_KEY = 'N/A';

const CountryInfo = () => {

    const [showMore, setShowMore] = useState(false)


    if (!country) {
        return <div>Loading...</div>;
    }

 

    return (
      <div className="country-details">
      <Banner country={country} />
      <InfoSection title="Official Information" country={country} />
      <GeographicalInfo country={country} />
      <LinksAndMaps country={country} />
      <EconomicAndPoliticalInfo country={country} />
      <TransportAndCommunicationInfo country={country} />
      <AdditionalDetails showMore={showMore} setShowMore={setShowMore} country={country} />
  </div>

    
    );






    


};

const Banner = ({ country }) => (
  <div className="banner">
      <img src={getOrDefault(country.flags.png)} className="flag" alt={`Flag of ${getOrDefault(country.name.common)}`} />
      <img src={getOrDefault(country.coatOfArms.png)} className="coat-of-arms" alt={`Coat of Arms of ${getOrDefault(country.name.common)}`} />
  </div>
);

const InfoSection = ({ title, country }) => (
  <div className="info-section">
      <h2>{title}</h2>
      {title === "Official Information" && (
          <>
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
          </>
      )}
  </div>
);


const GeographicalInfo = ({ country}) => {
  return (
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
  );
};





const LinksAndMaps = ({ country }) => {

  const defaultProps = {
      center: {
          lat: country.latlng[0],
          lng: country.latlng[1],
      },
      zoom: determineZoomLevel(country.area),
  };

  return (
      <div className="info-section links-maps">
          <h2>Links and Maps</h2>
          <a href={getOrDefault(country.maps.googleMaps)} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
          <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
              <GoogleMapReact bootstrapURLKeys={{ key: API_KEY }} 
              defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
                 
              </GoogleMapReact>
          </div>
      </div>
  );
};

const EconomicAndPoliticalInfo = ({ country }) => {
  const giniData = getLatestGini(country.gini);

  return (
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
              {giniData && giniData.year && (
                <>
                  <p className="title">{`GINI Index (${giniData.year}):`}</p>
                  <p>{getOrDefault(giniData.value)}</p>
                </>
              )}
              {country.fifa && (
                <>
                  <p className="title">FIFA Code:</p>
                  <p>{getOrDefault(country.fifa)}</p>
                </>
              )}
          </div>
      </div>
  );
};

const TransportAndCommunicationInfo = ({ country }) => (
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
);



const AdditionalDetails = ({ showMore, setShowMore, country }) => (
  <div>
      {showMore ? (
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

                  <TranslationsDropdown translations={country.translations} />

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

              <PostalInfoAndControl country={country} />

              <button className="showMoreLess" onClick={() => setShowMore(false)}>Show less...</button>
          </div>
      ) : (
          <button className="showMoreLess" onClick={() => setShowMore(true)}>Show more...</button>
      )}
  </div>
);

const PostalInfoAndControl = ({ country }) => (
  <div>
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
  </div>
);


export default CountryInfo;
