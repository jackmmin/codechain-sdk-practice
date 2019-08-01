import { SDK } from "codechain-sdk";

async function main() {
  const sdk = new SDK({
    server: "https://corgi-rpc.codechain.io",
    networkId: "wc"
  });

//   console.log( process.argv[0] );
//   console.log( process.argv[1] );
//   console.log( process.argv[2] );
//   console.log( process.argv[3] );

  const address = process.argv[2];
  const balance = await sdk.rpc.chain.getBalance( address );

  console.log( balance.toString() );
}

main().catch(console.error);