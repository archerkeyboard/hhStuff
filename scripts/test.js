const bnbAbi = require("./abi/WBNBAbi.json");

async function wrapBNBIfNeeded() {
  try {
    accounts = await hre.ethers.getSigners();
    signer = accounts[0];
    var signerAddress = await signer.getAddress();

    var wrappedBnbContract = await hre.ethers.getContractAt(
      bnbAbi,
      "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
      signer
    );

    var wrappedBNB = await wrappedBnbContract.balanceOf(signerAddress);
    if (wrappedBNB == 0 || wrappedBNB < 1000000000000000000) {
      console.log("Wrapping Bnb");

      await wrappedBnbContract.deposit({
        value: ethers.utils.parseUnits("10", 18),
      });
      console.log("Wrapped");
    } else {
      console.log(`WBNB Level - ${ethers.utils.formatEther(wrappedBNB)}`);
    }
  } catch (ex) {
    console.log(ex);
  }
}

wrapBNBIfNeeded();
