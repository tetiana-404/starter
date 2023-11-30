import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CurrencyConverter2 = () => {

    const mockData = [
        { "ccy": "CHF", "base_ccy": "UAH", "buy": "40.00670", "sale": "40.00670" },
        { "ccy": "CZK", "base_ccy": "UAH", "buy": "1.56860", "sale": "1.56860" },
        { "ccy": "GBP", "base_ccy": "UAH", "buy": "44.18370", "sale": "44.18370" },
        { "ccy": "ILS", "base_ccy": "UAH", "buy": "9.37100", "sale": "9.37100" },
        { "ccy": "JPY", "base_ccy": "UAH", "buy": "0.23848", "sale": "0.23848" },
        { "ccy": "NOK", "base_ccy": "UAH", "buy": "3.22790", "sale": "3.22790" },
        { "ccy": "PLZ", "base_ccy": "UAH", "buy": "8.65850", "sale": "8.65850" },
        { "ccy": "SEK", "base_ccy": "UAH", "buy": "3.31180", "sale": "3.31180" }
    ];

    //const [mockData, setMockData] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');

    const [error, setError] = useState(null);
    const [apiRequestCounter, setApiRequestCounter] = useState(0);

    useEffect(() => {
        fetchCurrencyRates();
    }, []);

    const fetchCurrencyRates = () => {
        fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4')
            .then(response => response.json())
            .then(data => {
                setCurrencies(data);
                setFromCurrency(data[0]?.ccy || '');
                setToCurrency(data[1]?.ccy || '');
            })
            .catch(() => {

                const mockData = [
                    { "ccy": "CHF", "base_ccy": "UAH", "buy": "40.00670", "sale": "40.00670" },
                    { "ccy": "CZK", "base_ccy": "UAH", "buy": "1.56860", "sale": "1.56860" },
                    { "ccy": "GBP", "base_ccy": "UAH", "buy": "44.18370", "sale": "44.18370" },
                    { "ccy": "ILS", "base_ccy": "UAH", "buy": "9.37100", "sale": "9.37100" },
                    { "ccy": "JPY", "base_ccy": "UAH", "buy": "0.23848", "sale": "0.23848" },
                    { "ccy": "NOK", "base_ccy": "UAH", "buy": "3.22790", "sale": "3.22790" },
                    { "ccy": "PLZ", "base_ccy": "UAH", "buy": "8.65850", "sale": "8.65850" },
                    { "ccy": "SEK", "base_ccy": "UAH", "buy": "3.31180", "sale": "3.31180" }
                ];
                setCurrencies(mockData);
                setFromCurrency(mockData[0]?.ccy || '');
                setToCurrency(mockData[1]?.ccy || '');
            });
    };


    const handleAmount1Change = (e) => {
        setAmount(e.target.value);
        convertCurrency(e.target.value, fromCurrency, toCurrency);
    };

    const handleCurrency1Change = (e) => {
        setFromCurrency(e.target.value);
        convertCurrency(amount, e.target.value, toCurrency);
    };

    const handleCurrency2Change = (e) => {
        setToCurrency(e.target.value);
        convertCurrency(amount, fromCurrency, e.target.value);
    };

    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);

        const tempAmount = amount;
        setAmount(convertedAmount);
        setConvertedAmount(tempAmount);

        //console.log(amount, tempAmount, convertedAmount, fromCurrency, toCurrency);

    };

    const convertCurrency = (amount, fromCurrency, toCurrency) => {
        if (isNaN(parseFloat(amount))) {
            return;
        }

        const fromCurrencyData = mockData.find((currency) => currency.ccy === fromCurrency);
        const toCurrencyData = mockData.find((currency) => currency.ccy === toCurrency);

        const exchangeRate = parseFloat(toCurrencyData.buy) / parseFloat(fromCurrencyData.sale);
        const convertedAmount = parseFloat(amount) * exchangeRate || '';

        if (toCurrency === toCurrency) {
            setConvertedAmount(convertedAmount.toFixed(2));
        } else {
            setAmount(convertedAmount.toFixed(2));
        }
    };

    return (
        <div className="container curr-convert">
            <div className="row text-center mb-4">
                <h1>Currency Converter</h1>
            </div>
            <div className="d-flex justify-content-center">
                <div className="input-group">
                    <input
                        className='form-control border-bottom-input'
                        type="number"
                        id="amount"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={handleAmount1Change} />

                    <select
                        className='input-group-append border-bottom-input'
                        id="fromCurrency"
                        value={fromCurrency}
                        onChange={handleCurrency1Change}>

                        {mockData.map((currency) => (
                            <option className='dropdown-item' key={currency.ccy} value={currency.ccy}>
                                {currency.ccy}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="">
                    <button className='icon arrow-btn' onClick={handleSwapCurrencies}>
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                    </button>
                </div>
                <div className="input-group">
                    <input
                        className='form-control border-bottom-input'
                        type="text"
                        id="convertedAmount"
                        placeholder="Converted amount"
                        value={convertedAmount} readOnly />

                    <select
                        className='border-bottom-input'
                        id="toCurrency" value={toCurrency} onChange={handleCurrency2Change}>
                        {mockData.map((currency) => (
                            <option key={currency.ccy} value={currency.ccy}>
                                {currency.ccy}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
export default CurrencyConverter2;