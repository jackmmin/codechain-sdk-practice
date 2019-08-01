import { SDK } from "codechain-sdk";

const sdk = new SDK({
    server: "https://corgi-rpc.codechain.io",
    networkId: "wc"
});

// async function main() {  // 주소 생성( 계정 생성 )
//     const address = await sdk.key.createPlatformAddress();
//     console.log( address.toString() );
// }



// async function main() {
//     const bestBlockNumber = await sdk.rpc.chain.getBestBlockNumber();
//     const bestBlock = await sdk.rpc.chain.getBlock( bestBlockNumber );
//     console.log( bestBlock );
// }




//wccq.....주소
const myAddress = "wccq9rfsvct2vl6ltqznatlvysn5admc3gzhuy6lfu0";
async function main() {
    const tx = sdk.core.createPayTransaction( {
        recipient: myAddress,
        quantity: "10000",
    });

    const seq = await sdk.rpc.chain.getSeq( myAddress );
    const signedTx = await sdk.key.signTransaction( tx, {
        account: myAddress,
        fee: 100,
        seq: await sdk.rpc.chain.getSeq( myAddress )
    });

    const txhash = await sdk.rpc.chain.sendSignedTransaction( signedTx );
    console.log( txhash );
}


main();