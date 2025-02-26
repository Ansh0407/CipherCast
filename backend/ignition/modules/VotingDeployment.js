const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingDeployment", (m) => {
  const voting = m.contract("Voting");

  return { voting };
});
