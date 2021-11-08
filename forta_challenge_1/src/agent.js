
const {
  handleTransaction: handleEvent,
} = require('./from.event')

const handleTransaction = async (txEvent) => {
  const findings = (
    await Promise.all([
      handleEvent(txEvent)
    ])
  ).flat();

  return findings;
};

module.exports = {
  handleTransaction, 
};
