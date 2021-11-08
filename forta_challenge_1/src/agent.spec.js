const {
  FindingType,
  FindingSeverity,
  Finding,
  createTransactionEvent,
} = require("forta-agent");
const { handleTransaction } = require("./agent");
//the address of the sybil that calls the fallback oracle
AAVE_SYBIL = "0x86f6d49ea08d296c3bd8f03ba276f414636b46b4"
describe("fallbackOracle agent", () => {
  const createTxEventWithFallbackOracle = (from) =>
    createTransactionEvent({
      receipt: { from },
    });

  describe("handleTransaction", () => {
    it("returns empty findings if the fallbackoracle event/function call did not occur", async () => {
      const txEvent = createTxEventWithFallbackOracle(AAVE_SYBIL);

      const findings = await handleTransaction(txEvent);

      expect(findings).toStrictEqual([]);
    });

    it("returns a finding if txEvent shows fallbackoracle was called", async () => {
      const txEvent = createTxEventWithFallbackOracle("0x86f6d49ea08d296c3bd8f03ba276f414636b46b4");

      const findings = await handleTransaction(txEvent);

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: "AaveFallbackOracle",
          description: "AaveFallbackOracle",
          alertId: "",
          severity: FindingSeverity.Medium,
          type: FindingType.Suspicious,
          metadata: {
            from: FromInvocation.args.logs.sybil,
            assets: FromInvocation.args.logs.assets,
            prices: FromInvocation.args.logs.prices
          }
        }),
      ]);
    });
  });
});
