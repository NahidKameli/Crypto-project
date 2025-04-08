import React, { useEffect, useState } from 'react'
import { searchCoin } from '../../Services/CryptoApi'
import { CirclesWithBar } from 'react-loader-spinner';
import styles from './Search.module.css'

function Search({ Currency, setCurrency, setChart }) {

  const [text, setText] = useState("")
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }
    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), { signal: controller.signal });
        const json = await res.json();
        if (json.coins) {
          setCoins(json.coins);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.name !== "AbortErro") {
          alert(error.massage);
        }
      }
    };
    setIsLoading(true);
    search();
    return () => controller.abort();

  }, [text]);

  // توی Search.js
const [selectedCoin, setSelectedCoin] = useState(null);

const handleCoinClick = (coin) => {
  setSelectedCoin(coin);
  setText("");
  setCoins([]);
};

  return (
    <div className={styles.searchBox}>
      <input type="text" placeholder="Search" value={text} onChange={e => setText(e.target.value)} />
      <select value={Currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {
         (!!coins.length || isLoading) && <div className={styles.searchResult}>

          {isLoading && (
            <div className={styles.loader}>
              <CirclesWithBar width="50" height="50" strokeWidth="3" color="#a94d72" />
            </div>
          )}

        {
         !isLoading && coins.map(coin => <li key={coin.id} className={styles.coinItem}>
            <img src={coin.thumb} alt="" />
            <p>{coin.name}</p>
          </li>)
        }

      {selectedCoin && (
  <div className={styles.coinInfo}>
    <h3>{selectedCoin.name}</h3>
    <p>Symbol: {selectedCoin.symbol}</p>
    <p>Market Cap Rank: {selectedCoin.market_cap_rank}</p>
  </div>
)}

      </div>
      }
    </div>
  )
}

export default Search