import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [amount,setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [isLoading, setIsLoading] = useState(false);
  const [converted, setConverted] = useState("");

  useEffect(
    function () {
      async function convert(){
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
        );
        const data = await res.json();
        setConverted(data.rates[toCurrency]);
        setIsLoading(false);
      }
      if (fromCurrency === toCurrency){
        return setConverted(amount);
      } 
      convert();
    },
    [amount, fromCurrency, toCurrency]
  );

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <input
        type="text"
        className="search"
        placeholder="Enter Amount.."
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <br />
      <div>
        <span>From : </span>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <div>
        <span>To : </span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <p>Converted {amount} {fromCurrency} to {converted} {toCurrency}</p>
    </div>
  );
}
