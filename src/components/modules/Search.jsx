import React, { useEffect, useState } from 'react'
import Chart from './Chart';
import { searchCoin } from '../../Services/CryptoApi'
import { CirclesWithBar } from 'react-loader-spinner';
import styles from './Search.module.css'

function Search({ Currency, setCurrency }) {

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

const [selectedCoin, setSelectedCoin] = useState(null);
const [chart, setChart] = useState(null);

// const handleCoinClick = (coin) => {
//   setSelectedCoin(coin);
//   setText("");
//   setCoins([]);
// };

  // هندلر انتخاب ارز
  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
    setText("");
    setCoins([]);
  };

  // هندلر نمایش نمودار ارز سرچ‌شده
  const handleShowChart = async () => {
    if (!selectedCoin) return;
    try {
      // دریافت داده‌های نمودار
      const chartRes = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=${Currency}&days=7`);
      const chartJson = await chartRes.json();
      // دریافت اطلاعات کامل ارز
      const infoRes = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency}&ids=${selectedCoin.id}`);
      const infoJson = await infoRes.json();
      let coinInfo = selectedCoin;
      if (infoJson && infoJson.length > 0) {
        coinInfo = {
          ...selectedCoin,
          image: infoJson[0].image,
          current_price: infoJson[0].current_price,
          ath: infoJson[0].ath,
          market_cap: infoJson[0].market_cap,
          total_volume: infoJson[0].total_volume
        };
      }
      setChart({ ...chartJson, coin: coinInfo });
    } catch (error) {
      setChart(null);
    }
  };

  // هندلر بستن اطلاعات ارز
  const handleCloseInfo = () => {
    setSelectedCoin(null);
  };

  // هندلر کلیک خارج از باکس سرچ
  useEffect(() => {
    function handleClickOutside(event) {
      const searchBox = document.getElementById('search-box');
      if (searchBox && !searchBox.contains(event.target)) {
        setCoins([]);
        setText("");
        setSelectedCoin(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.searchBox} id="search-box">
      <input type="text" placeholder="Search" value={text} onChange={e => setText(e.target.value)} />
      <select value={Currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {
         (!!coins.length || isLoading) && !selectedCoin && (
          <div className={styles.searchResult}>
            {isLoading && (
              <div className={styles.loader}>
                <CirclesWithBar width="50" height="50" strokeWidth="3" color="#a94d72" />
              </div>
            )}
            {!isLoading && coins.map(coin => (
              <li key={coin.id} className={styles.coinItem} onClick={() => handleCoinClick(coin)}>
                <img src={coin.thumb} alt="" />
                <p>{coin.name}</p>
              </li>
            ))}
          </div>
        )
      }
      {selectedCoin && !chart && (
        <div className={styles.coinInfo} onClick={handleShowChart} style={{cursor:'pointer'}}>
          <button className={styles.closeBtn} onClick={e => {e.stopPropagation(); handleCloseInfo();}}>&times;</button>
          <h3>{selectedCoin.name}</h3>
          <p>Symbol: {selectedCoin.symbol}</p>
          <p>Market Cap Rank: {selectedCoin.market_cap_rank}</p>
          <p>
            Price: {
              Currency === "usd" ? "$" :
              Currency === "eur" ? "€" :
              Currency === "jpy" ? "¥" : ""
            }
            {selectedCoin.market_cap_rank ? selectedCoin.market_cap_rank : selectedCoin.price ? selectedCoin.price : selectedCoin.market_cap_rank}
          </p>
          <span style={{display:'block',marginTop:'10px',color:'#a94d72',fontWeight:'bold'}}>Show Chart</span>
        </div>
      )}
      {chart && (
        <Chart chart={chart} setChart={setChart} />
      )}
    </div>
  )
}

export default Search