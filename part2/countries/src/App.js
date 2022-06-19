import {useState, useEffect} from "react";
import axios from "axios";
import Details from "./Details";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [activeCountry, setActiveCountry] = useState('');

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log(response.data)
                setCountries(response.data);
            });
    }, [])

    useEffect(() => {
        const countriesArray = inputValue ? countries.filter(country => country.name.common.toLowerCase().includes(inputValue.toLowerCase())) : [];
        setFilteredCountries(countriesArray);
    }, [inputValue, countries])

    const handleInputChange = e => setInputValue(e.target.value);
    const handleShowCountryView = (e) => {
        setActiveCountry(e.target.getAttribute('data-name'))
    };

    return (
        <div>
         <div>
             <label>
                 find countries
                 <input value={inputValue} onChange={handleInputChange} />
             </label>
         </div>
            {filteredCountries.length === 1 && filteredCountries.map(country => {
                console.log(Object.values(country.languages))
                return ( <Details country={country} /> )
            })}

            {filteredCountries.length > 1 && filteredCountries.length < 10 && filteredCountries.map((country) => {

                return (
                    <>
                        <div>
                            <span>{country.name.common}</span>
                            <button onClick={handleShowCountryView} data-name={country.name.common}>show</button>
                            {activeCountry === country.name.common ? <Details country={country} /> : null}
                        </div>
                    </>
                    )

            })}
            {filteredCountries.length > 10 && 'too many'}
        </div>
    );
};

export default App;