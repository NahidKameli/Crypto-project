import { CirclesWithBar } from "react-loader-spinner";
import styles from './TableCoin.module.css';
import { marketChart } from "../../Services/CryptoApi";


function TableCoin({ coins , isLoading, Currency, setChart }) {
  console.log(coins);

  return (
   <div className={styles.container}>
    {isLoading ? <div style={{marginTop:"20%"}}><CirclesWithBar color="#a94d72" With="3"/></div> :  
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Coin</th>
          <th>Name</th>
          <th>Price</th>
          <th>24h</th>
          <th>Total Volume</th>
        </tr>
      </thead>
      <tbody>
        {
          coins.map(coin=> <TableRow coin={coin} key={coin.id} Currency={Currency} setChart={setChart}/>)
        }
      </tbody>
    </table>}
   </div>
  )
  
}

export default TableCoin


const TableRow=({ coin, Currency, setChart})=> {

  const { id, image, name, symbol, current_price, total_volume, price_change_percentage_24h: price_change} = coin;

  const currencySymbol =
  Currency === "usd" ? "$" :
  Currency === "eur" ? "€" :
  Currency === "jpy" ? "¥" : null;
  const showHandler=async ()=>{
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      setChart({... json, coin});
      
    } catch (error) {

      setChart(null)
    }
  }

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
          <img src={image} alt="" />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>{currencySymbol}{current_price.toLocaleString()}</td>
      <td className={price_change>0 ? styles.success : styles.error}>{price_change.toFixed(2)}</td>
      <td>{total_volume.toLocaleString()}</td>
    </tr>
  )
}

