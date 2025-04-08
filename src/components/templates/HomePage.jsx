import { useEffect, useState } from 'react'
import { getCoinList } from '../../Services/CryptoApi';
import TableCoin from '../modules/TableCoin';
import Pagination from '../modules/Pagination';
import NavBar from './NavBar';
import Search from '../modules/Search';
import Chart from '../modules/Chart';
import Footer from './Footer';


function HomePage() {

    const [coins, setcoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [Currency, setCurrency] = useState("usd");
    const [chart, setChart] = useState(null);

    useEffect(() => {

        setIsLoading(true);
        const getData = async () => {
            try {
                const res = await fetch(getCoinList(page, Currency));
                const json = await res.json();
                setcoins(json);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                
            }
        }
        getData();

    }, [page, Currency]);


    return (

        <div>
            <NavBar />
            <Search Currency={Currency} setCurrency={setCurrency} />
            <TableCoin coins={coins} isLoading={isLoading} setChart={setChart}/>
            <Pagination page={page} setPage={setPage} />
            <Footer/>
            {
                !!chart && <Chart chart={chart} setChart={setChart}/>
            }
        </div>
    )
}

export default HomePage