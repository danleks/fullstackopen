import Weather from "./Weather";

const Details = ({country}) => {
    return (
        <div className='show'>
            <p>{country.name.common}</p>
            <p>area {country.area}</p>
            <p>capital {country.capital[0]}</p>

            <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common}/>
            <Weather capitalInfo={{name: country.capital[0], lat: country.capitalInfo.latlng[0], lng: country.capitalInfo.latlng[1]}} />
        </div>
    );
};

export default Details;