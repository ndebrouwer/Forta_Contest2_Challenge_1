const {ethers} = require('ethers');
const ABI  = require("./ABI");
const {
    Finding,
    FindingSeverity,
    FindingType,
} = require("forta-agent");
const avalanche_endpoint = "your avalanche endpoint here"
const polygon_endpoint = "your poylgon endpoint here";
const kovan_endpoint = "https://kovan.infura.io/v3/625e9f003d984473bfed3e343c72b684"
const mainnet_endpoint = 'https://mainnet.infura.io/v3/625e9f003d984473bfed3e343c72b684'
//push your endpoints into endpoints array so code works
var endpoints = [];
endpoints.push(mainnet_endpoint);
const provider = new ethers.providers.JsonRpcProvider(mainnet_endpoint);

/*
const polygon_provider = new ethers.providers.JsonRpcProvider(polygon_endpoint);
const avalanche_provider = new ethers.providers.JsonRpcProvider(avalanche_endpoint);

const lp_addr_main = "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9";
const lp_addr_amm =  "0x7937D4799803FbBe595ed57278Bc4cA21f3bFfCB";
const lp_addr_polygon = "0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf";
const lp_addr_avalanche = "0x4F01AeD16D97E3aB5ab2B501154DC9bb0F1A5A2C";

var LP_ABI = ["function getReservesList() external view returns (address[] memory)"]
const Main_LendingPool = new ethers.Contract(lp_addr_main, LP_ABI, provider );
const AMM_LendingPool = new ethers.Contract(lp_addr_amm, LP_ABI, provider );
const Polygon_LendingPool = new ethers.Contract(lp_addr_polygon, LP_ABI, polygon_provider );
const Avalanche_LendingPool = new ethers.Contract(lp_addr_avalanche, LP_ABI, avalanche_provider );
const LendingPools = new Array[Main_LendingPool,AMM_LendingPool,Polygon_LendingPool,Avalanche_LendingPool];
var ReservesListMain = [];
var ReservesListAMM = [];
var ReservesListPolygon = [];
var ReservesListAvalanche = [];
Main_LendingPool.getReservesList().then((res,err) =>{
    console.log(res);
    ReservesListMain = res;
    
})
.then( ()=> 

    AMM_LendingPool.getReservesList().then((res,err) =>{
        console.log(res);
        ReservesListAMM = res;
    } ) 
)
.then( ()=>{
    Polygon_LendingPool.getReservesList().then((res,err) =>{
        console.log(res);
        ReservesListPolygon = res;
    }
)
.then( ()=>{
    Avalanche_LendingPool.getReservesList().then((res,err) =>{
        console.log(res);
        ReservesListAvalanche = res;
    }
)
.then( ()=>{
    console.log("promise chain completed, all reserve lists populated")
    }
);
*/
const PRICEORACLE_ADDRESS = "0xa50ba011c48153de246e5192c8f9258a2ba79ca9";

const PriceOracle = new ethers.Contract(
    PRICEORACLE_ADDRESS,
    ABI.PRICEORACLE_ABI,
    provider );
PriceOracle.getAssetPrice("0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9").then( (res, err) => {
    result = res;
    console.log("printing price stuff");
    console.log(result);
    price =  new ethers.BigNumber.from(result._hex).toString();
    console.log(ethers.utils.formatEther(price) );
});
PriceOracle.getSourceOfAsset("0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9").then( (res, err) => {
    result = res;
    console.log(result);
});
FromOracleGetAssetPrice = async (token_address) => {
    price = 0;
    let res = await PriceOracle.getAssetPrice(token_address);
    price= new ethers.BigNumber.from(res._hex).toString();
    price = (ethers.utils.formatEther(price) );
    console.log(price, "printing price from the function");
    return price;
      
}
  price = FromOracleGetAssetPrice("0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9");
    
