import React, {useState} from 'react'
import currencies from "./supported-currencies.json";

const App = () => {
  const defaultCurrency = "AUD";
  const [currency, setCurrency] = useState(defaultCurrency);
  const [bitcoinData, setBitcoinData] = useState({});

  const onOptionChange = (event) => {
    setCurrency(event.target.value);
  }

  return (
    <div >
      <span>Select your currency: </span>
      <select value={currency} onChange={onOptionChange}>
      {currencies.map((obj, index)=> (
        <option key={`${index}-${obj.country}`} value={obj.currency}>{obj.country}</option>
      ))}
      </select>
      <h1>Bitcoin Data for {currency}</h1>
      {Object.keys(bitcoinData).map((date) => (
        <div key={date}>
          Date: {date} Value: {bitcoinData[date]}
        </div>
      ))}
    </div>
  );
};

export default App
