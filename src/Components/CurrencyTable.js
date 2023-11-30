import React from 'react';
import { useState } from 'react';
import useSWR from 'swr';
import 'bootstrap/dist/css/bootstrap.min.css';

const CurrencyTable = () => {
    const { data, error, mutate } = useSWR('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4', fetcher);

    const [showTable, setShowTable] = useState(true);
    const [editableCells, setEditableCells] = useState([]);
    const [inputValues, setInputValues] = useState('');
    const [showEditIcon, setShowEditIcon] = useState([]);
    const [initialValue, setInitialValue] = useState(0);


    const handleCellHover = (ccy, type) => {
        if (!editableCells) {
            //setEditableCells({ ccy, type });
            setShowEditIcon({ ccy, type });
        }

    };

    const handleCellLeave = (ccy, type) => {
        if (editableCells) {
            setEditableCells(null);

        }
        setShowEditIcon(null);
    };

    const handleEditIconClick = (ccy, type) => {
        if (!editableCells) {
            setEditableCells({ ccy, type });
            setShowEditIcon(null);
        }
        setInputValues(data.find((item) => item.ccy === ccy)?.buy || '');
        setInitialValue(data.find((item) => item.ccy === ccy)?.buy || 0);
    }

    const isSaveDisabled = () => {
        const numericValue = parseFloat(inputValues);
        const numericInitialValue = parseFloat(initialValue);

        if (!isNaN(numericValue)) {
            const lowerBound = numericInitialValue - numericInitialValue * 0.1;
            const upperBound = numericInitialValue + numericInitialValue * 0.1;
            return numericValue < lowerBound || numericValue > upperBound;
        }
        return true;
    };

    const handleSaveIconClick = async (currency) => {
        const updatedData = data.map((currencyData) => {
            if (currencyData.ccy === currency && editableCells.type === 'buy') {
                return { ...currencyData, buy: inputValues };
            }
            if (currencyData.ccy === currency && editableCells.type === 'sale') {
                return { ...currencyData, sale: inputValues };
            }
            return currencyData;
        });

        await mutate(updatedData, false);

        setEditableCells(null);
    };

    const handleCancelIconClick = () => {
        setEditableCells(null);
    };

    if (error) {
        setShowTable(false);
        return <div>Error fetching data. Please try again later.</div>;
    }

    if (!data) return <div>Loading...</div>;

    return (
        <div className='table-responsive '>
            {showTable &&
                <table className="table table-hover">
                    <thead className="thead-light">
                        <tr className=''>
                            <th className='col-4' scope="col">Currency</th>
                            <th className="col-4" scope="col">Buy</th>
                            <th className="col-4" scope="col">Sell</th>
                        </tr>
                    </thead>
                    <tbody className=" container">

                        {data.map((currencyData) => (
                            <tr
                                className=''
                                key={currencyData.ccy}
                            >
                                <td className="col-4" scope="row">{currencyData.ccy}</td>
                                <td
                                    className="col-4, text-right"
                                    data-testid={`editable-cell-${currencyData.ccy}-buy`}
                                    role="cell"
                                    onMouseEnter={() => handleCellHover(currencyData.ccy, 'buy')}
                                    onMouseLeave={() => handleCellLeave(currencyData.ccy, 'buy')}
                                >
                                    {editableCells?.ccy === currencyData.ccy && editableCells.type === 'buy' ? (
                                        <>
                                            <div className="input-group input-group-sm">
                                                <input
                                                    className="form-control"
                                                    role="textbox"
                                                    type="number"
                                                    value={Number(inputValues).toFixed(2)}
                                                    onChange={(e) => setInputValues(e.target.value)}
                                                />
                                                <div className="input-group-prepend">
                                                    <span
                                                        className={`icon ${isSaveDisabled() ? 'disabled' : ''}`}
                                                        onClick={() => !isSaveDisabled() && handleSaveIconClick(currencyData.ccy)}
                                                    >💾
                                                    </span>
                                                    <span className="icon" onClick={handleCancelIconClick}>
                                                        ❌
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>

                                            {Number(currencyData.buy).toFixed(2)}
                                            {showEditIcon?.ccy === currencyData.ccy && showEditIcon.type === 'buy' && (
                                                <span className="icon" onClick={() => handleEditIconClick(currencyData.ccy, 'buy')}>
                                                    ✏️
                                                </span>
                                            )}
                                        </>
                                    )}
                                </td>
                                <td
                                    className="col-4"
                                    onMouseEnter={() => handleCellHover(currencyData.ccy, 'sale')}
                                    onMouseLeave={() => handleCellLeave(currencyData.ccy, 'sale')}
                                >
                                    {editableCells?.ccy === currencyData.ccy && editableCells.type === 'sale' ? (
                                        <>
                                            <div className="input-group input-group-sm">
                                                <input
                                                    className="form-control"
                                                    role='textbox'
                                                    type="number"
                                                    value={Number(inputValues).toFixed(2)}
                                                    onChange={(e) => setInputValues(e.target.value)}
                                                />
                                                <div className="input-group-prepend">
                                                    <span
                                                        className={`icon ${isSaveDisabled() ? 'disabled' : ''}`}
                                                        onClick={() => !isSaveDisabled() && handleSaveIconClick(currencyData.ccy)}
                                                    >💾
                                                    </span>
                                                    <span className="icon" onClick={handleCancelIconClick}>
                                                        ❌
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {Number(currencyData.sale).toFixed(2)}
                                            {showEditIcon?.ccy === currencyData.ccy && showEditIcon.type === 'sale' && (
                                                <span className="icon" onClick={() => handleEditIconClick(currencyData.ccy, 'sale')}>
                                                    ✏️
                                                </span>
                                            )}
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }

        </div>
    );

}

//const fetcher = (url) => fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4').then((res) => res.json());

const fetcher = async (url) => {
    try {
        const response = await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {

        return [
            { "ccy": "CHF", "base_ccy": "UAH", "buy": "40.00670", "sale": "40.00670" },
            { "ccy": "CZK", "base_ccy": "UAH", "buy": "1.56860", "sale": "1.56860" },
            { "ccy": "GBP", "base_ccy": "UAH", "buy": "44.18370", "sale": "44.18370" },
            { "ccy": "ILS", "base_ccy": "UAH", "buy": "9.37100", "sale": "9.37100" },
            { "ccy": "JPY", "base_ccy": "UAH", "buy": "0.23848", "sale": "0.23848" },
            { "ccy": "NOK", "base_ccy": "UAH", "buy": "3.22790", "sale": "3.22790" },
            { "ccy": "PLZ", "base_ccy": "UAH", "buy": "8.65850", "sale": "8.65850" },
            { "ccy": "SEK", "base_ccy": "UAH", "buy": "3.31180", "sale": "3.31180" }
        ];
    }
};

export default CurrencyTable;