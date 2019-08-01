// import { SDK } from "codechain-sdk";

// async function main() {
//   const sdk = new SDK({
//     server: "https://corgi-rpc.codechain.io",
//     networkId: "wc"
//   });

//   const getBlock = await sdk.rpc.chain.getBlock(hashOrNumber: H256Value | number);
//   console.log( BlockId );
// }

// main().catch( console.error );

import { SDK } from "codechain-sdk";

async function main() {
  const sdk = new SDK({
    server: "https://corgi-rpc.codechain.io",
    networkId: "wc"
  });

  const getId = await sdk.rpc.chain.getBestBlockId();
  console.log( getId );
  const hashWithout0x = getId.hash.toString().slice( 2 );
  const buffer = Buffer.from( hashWithout0x, "hex" );
  console.log( buffer );
  const randomNumber = buffer.readUInt32LE( 0 );

  console.log( `Random number is ${randomNumber}` );
}

main().catch(console.error);