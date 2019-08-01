import { SDK } from "codechain-sdk";

async function main() {
  const sdk = new SDK({
    server: "https://corgi-rpc.codechain.io",
    networkId: "wc"
  });

  const BlockId = await sdk.rpc.chain.getBestBlockId();
  console.log( BlockId );
}

main().catch( console.error );
