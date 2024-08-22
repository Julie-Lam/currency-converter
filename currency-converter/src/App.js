import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("USD");

  const [output, setOutput] = useState("Output");
  useEffect(
    function () {
      async function fetchData() {
        try {
          const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`;

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }

          const json = await response.json();
          switch (toCur) {
            case "USD":
              setOutput(`$${json.rates.USD}`);
              break;
            case "EUR":
              setOutput(`$${json.rates.EUR}`);
              break;
            case "CAD":
              setOutput(`$${json.rates.CAD}`);
              break;
            case "INR":
              setOutput(`$${json.rates.INR}`);
              break;
            default:
              break;
          }
        } catch (error) {
          console.error(error.message);
        }
      }

      if (fromCur !== toCur && amount) {
        fetchData();
      }
    },
    [amount, fromCur, toCur]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
