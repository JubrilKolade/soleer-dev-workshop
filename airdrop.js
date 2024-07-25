import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { generateKey } from './keygen.js'; 
(async () => {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const myPublicKey = new PublicKey(generateKey().publicKey); 
    const lamports = LAMPORTS_PER_SOL * 0.2;
    const signature = await connection.requestAirdrop(myPublicKey, lamports);
    await connection.confirmTransaction(signature);
})();