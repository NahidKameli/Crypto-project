const BASE_URL="https://api.coingecko.com/api/v3/";
const API_KEY="CG-YVQS8pJMygZz7rjEVVvz9Pmp";

const getCoinList=(page,currency)=>{
    return `${BASE_URL}/coins/markets?vs_currency=${currency}&page=${page}&per_page=10&x_cg_demo_api_key=${API_KEY}`;
}

const searchCoin=(query)=>`${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`
const marketChart=(coin)=> `${BASE_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=${API_KEY}`;



export {getCoinList,searchCoin,marketChart};