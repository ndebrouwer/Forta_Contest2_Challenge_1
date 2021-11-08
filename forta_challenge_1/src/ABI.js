const {ethers} = require('ethers');
//replace json rpc provider with your own, was using mine for testing purposes
const main_priceoracle_addr = "0xa50ba011c48153de246e5192c8f9258a2ba79ca9";
const amm_priceoracle_addr = main_priceoracle_addr;
const polygon_priceoracle_addr = "0x0229F777B0fAb107F9591a41d5F02E4e98dB6f2d";
const avalanche_priceoracle_addr = "0xdC336Cd4769f4cC7E9d726DA53e6d3fC710cEB89";
var priceOracle_addr = [];
var fallbackOracle_addr = [];
priceOracle_addr.push(main_priceoracle_addr,amm_priceoracle_addr,polygon_priceoracle_addr,avalanche_priceoracle_addr);
const PRICEORACLE_ABI = [
  "function getAssetPrice(address asset) public override view returns (uint256)",
  "function getSourceOfAsset(address asset) external view returns (address)",
  "function getFallbackOracle() external view returns (address)"
];
const FALLBACKORACLE_ABI = [
  "function submitPrices(address[] calldata assets, uint128[] calldata prices) external"
]
const Aave_Sybil = "0x86f6d49ea08d296c3bD8F03Ba276F414636B46b4";
module.exports = {
priceOracle_addr, PRICEORACLE_ABI, fallbackOracle_addr, main_priceoracle_addr, FALLBACKORACLE_ABI,
Aave_Sybil
}