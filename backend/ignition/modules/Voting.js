const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingModule", (m) => {
    const votingStart = m.getParameter("votingStart", Math.floor(Date.now() / 1000));
    const votingEnd = m.getParameter("votingEnd", Math.floor(Date.now() / 1000) + 86400); // Default to 24 hours later

    const voting = m.contract("Voting");

    m.call(voting, "setDates", [votingStart, votingEnd]);

    return { voting };
});

// This script will deploy the Voting contract and set the start and end dates automatically! 🚀
