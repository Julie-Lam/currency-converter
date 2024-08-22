import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("USD");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);

        try {
          const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`;

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }

          const json = await response.json();

          setOutput(`${json.rates[toCur]}`);
        } catch (error) {
          console.error(error.message);
        }

        setIsLoading(false);
      }

      if (fromCur === toCur) {
        setOutput(`${amount}`);
        return;
      }
      fetchData();
    },
    [amount, fromCur, toCur]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>${output}</p>
    </div>
  );
}
