import { ethers } from "hardhat";

async function main() {
  const [owner, admin1] = await ethers.getSigners();
  const admin = [owner.address, admin1.address, "0xE6e2595f5f910c8A6c4cf42267Ca350c6BA8c054"];

  // const CloneMultiSig = await ethers.getContractFactory("cloneMultiSig");
  // const cloneMultiSig = await CloneMultiSig.deploy();
  // await cloneMultiSig.deployed();

  // console.log(`Multisig Address is ${cloneMultiSig.address}`);
  // // console.log(admin1.address, admin1.address, owner.address);

  // const newMultisig = await cloneMultiSig.createMultiSig(admin);
  // let event = await newMultisig.wait();
  // let newChild = event.events[0].args[0];
  // console.log(newChild);

  //////////////////////////////////////////////////

  const childMultisig = await ethers.getContractAt("IMultisig", '0x4943D19B1e8A599121dD216ae5b01D5448248751');
  const addresses = await childMultisig.returnAdmins();
  // console.log(newChild);

  await childMultisig.addAdmin('0x6A33E2d7F348F96BF7fA41491BedB97456ec0Dc9');
  await childMultisig.connect(admin1).addAdmin('0x6A33E2d7F348F96BF7fA41491BedB97456ec0Dc9');

  const addressesNew = await childMultisig.returnAdmins();
  console.log(addressesNew);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});