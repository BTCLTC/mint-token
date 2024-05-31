import {
  Keypair,
  LAMPORTS_PER_SOL,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";
import * as fs from "fs";
import bs58 from "bs58";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// generate a new wallet keypair
const wallet = Keypair.generate();
console.log("New wallet:", wallet.publicKey.toBase58());

const secretKey = bs58.encode(wallet.secretKey);

console.log("Wallet secret key:", secretKey);

// write secret key to a .json file
const secret_array = wallet.secretKey
  .toString()
  .split(",")
  .map((value) => parseInt(value));

const secret = JSON.stringify(secret_array);

// tyr to write the secret key to a file
try {
  fs.writeFileSync("secret.json", secret, "utf8");
} catch (err) {
  console.log("Error writing file:", err);
}

// airdrop 1 sol to the new wallet

(async () => {
  let airdropSignature = await connection.requestAirdrop(
    wallet.publicKey,
    LAMPORTS_PER_SOL
  );

  // try
  try {
    const txId = await airdropSignature;
    console.log("TxId:", txId);
    console.log("https://explorer.solana.com/tx/" + txId + "?cluster=devnet");
  } catch (err) {
    console.log("Error:", err);
  }
})();

// run command: 
// ts-node wallet.ts

// 3nxFtG8dKpdAVhoSTMo8trDphWUidpjkc4oV4YarJ9nTzQ8fKiTuj6ToaHoRh5hgFtr5QcRCA8zjZcUf75m4TDTN
