import { SDK } from "codechain-sdk";

// Change platformAddress
const platformAddress = "wccq9rfsvct2vl6ltqznatlvysn5admc3gzhuy6lfu0";
// Change assetAddress
const assetAddress = "wcaqyqhf2ysdzjvjemlvwpz00vcz0r8rl7swj6q7cej7f";
const passphrase = "";

async function main() {
  const sdk = new SDK({
    server: "https://corgi-rpc.codechain.io",
    networkId: "wc",
    keyStoreType: {
      type: "local",
      path: "./keystore.db"
    }
  });

  const assetScheme = sdk.core.createAssetScheme( {
      shardId: 0,
      metadata: "jongmin's Gold",
      supply: 777
  });

  const mintAssetTransaction = sdk.core.createMintAssetTransaction( {
      scheme: assetScheme,
      recipient: assetAddress
  })

  const seq = await sdk.rpc.chain.getSeq( platformAddress );
  console.log(`seq ${seq}`);

  const signedTx = await sdk.key.signTransaction( mintAssetTransaction, {
      account: platformAddress,
      fee: 100000,
      seq: seq
  } );

  const txHash = await sdk.rpc.chain.sendSignedTransaction( signedTx );
  console.log(`TxHash ${txHash}`);

  for (let index = 0; index < 30; index++) {
    const contained = await sdk.rpc.chain.containsTransaction(txHash);
    if (contained) {
      console.log(`Transaction ${txHash.toString()} is mined`);
      return;
    }
    delay(1000);
  }

  console.log(
    `The transaction(${txHash.toString()}) is not mined after 30 seconds. Please check net network status or your mistake`
  );
}

main().catch(console.error);

function delay(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}