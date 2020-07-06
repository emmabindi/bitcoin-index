import React, {useState} from 'react'

const App = () => {
  const defaultCurrency = "AUD";
  const [currency, setCurrency] = useState(defaultCurrency);
  return (
    <div >
          The basic empty template
    </div>
  )
}

export default App
