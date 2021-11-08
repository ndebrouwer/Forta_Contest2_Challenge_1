const { ethers } = require("ethers");
const { Finding, FindingSeverity, FindingType, transactionEvent,   getJsonRpcUrl,
} = require("forta-agent");
const ABI = require('./ABI');
const AAVEFALLBACKORACLE_EVENT =
  "event PricesSubmitted(address sybil, address[] assets, uint128[] prices)";
/* 

*/
eth_endpoint = 'https://mainnet.infura.io/v3/625e9f003d984473bfed3e343c72b684';

const provider = new ethers.providers.JsonRpcProvider(getJsonRpcUrl());
//we do not instantiate a AMM_priceOracle as the AMM market uses the same oracle as the Main market
Main_priceOracle = new ethers.Contract(ABI.main_priceoracle_addr, ABI.PRICEORACLE_ABI, provider); 
const getFallbackOracle = async (oracle) => {
  return await oracle.getFallbackOracle();
}

const handleTransaction = async (txEvent) => {
  const findings = [];
  ABI.fallbackOracle_addr.push(await getFallbackOracle(Main_priceOracle));
  // filter the transaction logs for PricesSubmitted events
/*  
  const AaveFallbackOracleEvents = txEvent.filterEvent(
    AAVEFALLBACKORACLE_EVENT,
    ABI.fallbackOracle_addr[0]
  );
  console.log(AaveFallbackOracleEvents);
*/

let scanTxn =  (txEvent) => {
  console.log(txEvent);
  if(txEvent.from.toLowerCase() === ABI.Aave_Sybil.toLowerCase() && 
  txEvent.to.toLowerCase() === ABI.fallbackOracle_addr[0].toLowerCase()) 
  { 
    return txEvent; } 
  }
let AaveFallbackOracleEvents = []; 
AaveFallbackOracleEvents.push(scanTxn(txEvent));
  // fire alerts for events
  AaveFallbackOracleEvents.forEach((FallbackOracleEvent) => {
    findings.push(
      Finding.fromObject({
        name: "AaveFallbackOracle",
        description: "AaveFallbackOracle was called",
        alertId: "AAVE-1",
        severity: FindingSeverity.Medium,
        type: FindingType.Suspicious,
      })
    );
  });

  return findings;
};

module.exports = {
  handleTransaction,
};