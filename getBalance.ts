import {
  Keypair,
  LAMPORTS_PER_SOL,
  Connection,
  clusterApiUrl,
} from "@solana/web3.js";
import * as fs from "fs";
import bs58 from "bs58";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

//  get public key from secret key
const secret = fs.readFileSync("secret.json", "utf8");
const secret_array = JSON.parse(secret);
const secretKey = new Uint8Array(secret_array);
const wallet = Keypair.fromSecretKey(secretKey);

console.log("Wallet:", wallet.publicKey.toBase58());



// get balance
(async () => {
  const balance = await connection.getBalance(wallet.publicKey);
  console.log("Balance:", balance);
})();

// run command: ts-node getBalance.ts
