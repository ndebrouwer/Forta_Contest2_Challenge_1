const aave = require('@aave/protocol-js');
v2= aave.v2;
console.log(v2.formatReserves({"query": "{ reserves (where: {usageAsCollateralEnabled: true})  { id name price {id} liquidityRate variableBorrowRate stableBorrowRate}}" }) )