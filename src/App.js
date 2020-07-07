import React, {useState, useEffect} from 'react'
import currencies from "./supported-currencies.json";

const App = () => {
  const defaultCurrency = "AUD";
  const [currency, setCurrency] = useState(defaultCurrency);
  const [bitcoinData, setBitcoinData] = useState({});

  const onOptionChange = (event) => {
    setCurrency(event.target.value);
  };

  const bitcoinAPI = "https://api.coindesk.com/v1/bpi/historical/close.json";
  useEffect(() => {
    console.log("Inside useEffect")
    async function getData() {
      try {
        const response = await fetch(`${bitcoinAPI}?currency=${currency}`)
        const data = await response.json()
        setBitcoinData(data.bpi)
      } catch(err) {
        console.log(err)
      }
    }
    getData();
  }, [currency])

  // Not async/await
  // const bitcoinAPI = "https://api.coindesk.com/v1/bpi/historical/close.json";
  // useEffect(() => {
  //   console.log("Inside useEffect")
  //   function getData() {
  //     fetch(`${bitcoinAPI}?currency=${currency}`)
  //       .then((response) => response.json())
  //       .then((data) => setBitcoinData(data.bpi))
  //       .catch((e) => e);
  //   }
  //   getData();
  // }, [currency])

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
