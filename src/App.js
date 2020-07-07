import React, {useState, useEffect} from 'react'
import currencies from "./supported-currencies.json";
import {Line} from 'react-chartjs-2';

const App = () => {
  // set default, only used once 
  const defaultCurrency = "AUD";
  // Invoke useState function & pass it AUD, it returns an array 
  // 1st item in array is initial state (AUD) then 2nd is a function which is similar to this.setState. This function will set the currency state.
  // Here the array is set with destructing. setCurrency == setState
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

  const lineGraphData = {
    labels: Object.keys(bitcoinData),
    datasets: [
      {
        label: "BCI",
        data: Object.values(bitcoinData),
        backgroundColor: "#ffcccb"
      }
    ]
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
      <Line data={lineGraphData} />
      <h4>Values: </h4>
      {Object.keys(bitcoinData).map((date) => (
        <div key={date}>
          Date: {date} Value: {bitcoinData[date]}
        </div>
      ))}
    </div>
  );
};

export default App

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