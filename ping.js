const SDK = require( "codechain-sdk" );

const sdk = new SDK( { server: "https://corgi-rpc.codechain.io" } );

async function main() {
    const response = await sdk.rpc.node.ping()
    console.log( response );
}

main();
