import {
  percentAmount,
  generateSigner,
  signerIdentity,
  createSignerFromKeypair,
} from "@metaplex-foundation/umi";
import {
  TokenStandard,
  createAndMint,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import * as web3 from "@solana/web3.js";
import secret from "./secret.json";

const connection = new web3.Connection(
  web3.clusterApiUrl("devnet"),
  "confirmed"
);

const umi = createUmi(connection);
console.log("Umi", umi);

const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
console.log("User wallet", userWallet);
const userWalletSigner = createSignerFromKeypair(umi, userWallet);
console.log("User wallet signer", userWalletSigner);

const metadata = {
  name: " token 2000 ",
  symbol: "Hidden",
  description: "Hidden is a test token",
  uri: "https://cyan-minimum-cheetah-301.mypinata.cloud/ipfs/QmR44SZ1pnfgLaP1psjorvKRjmSpESXxEbyi2m49sxTiPE/hidden.jpeg"
};

const mint = generateSigner(umi);
umi.use(signerIdentity(userWalletSigner));
umi.use(mplCandyMachine());

createAndMint(umi, {
  mint,
  authority: umi.identity,
  name: metadata.name,
  symbol: metadata.symbol,
  uri: metadata.uri,
  sellerFeeBasisPoints: percentAmount(0),
  decimals: 8,
  amount: 1000000000_00000000,
  tokenOwner: userWallet.publicKey,
  tokenStandard: TokenStandard.Fungible,
})
  .sendAndConfirm(umi)
  .then(() => {
    console.log("Token created and minted", mint.publicKey);
  });

// run command:
// ts-node mint.ts


// https://coinfactory.app/en/generator/solana/spl-token#
// https://docs.phantom.app/library-integrations/rainbowkit