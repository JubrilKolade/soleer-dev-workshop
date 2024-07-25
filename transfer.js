// import { Connection, Keypair, PublicKey, sendAndConfirmRawTransaction, SystemProgram, Transaction } from '@solana/web3.js'
// import walletkey from'./wallet.json' assert {type: 'json'}

// const to = new PublicKey('DXYCBhw2aSYXRkJKX2HY4XpuYmsnN9DvZt5sZZj7Dq73')
// const from = Keypair.fromSecretKey(new Uint8Array(walletkey))

// const connection = new Connection('https://api.devnet.solana.com')
// console.log({to,  from})

// const transfer =  async () => {
//     const balance = connection.getBalance(from.publicKey)
//     console.log(balance)

//     if(balance === 0) {
//         console.log('broke in sol')
//     } else {
//         const transaction = new Transaction().add(
//             SystemProgram.transfer({
//                 fromPubkey: from.publicKey,
//                 toPubkey: to,
//                 lamports: balance
//             })
//         ) 
//         transaction.feePayer = from.publicKey;

//             const fee = (
//             await connection.getFeeForMessage(
//             transaction.compileMessage(), 'confirmed'
//           )   
//          ).value || 0;

//          const recentBlockHash = await connection.getLatestBlockhash();
//          transaction.recentBlockhash = recentBlockHash.blockhash;

//          transaction.instructions.pop();

//          transaction.add (
//             SystemProgram.transfer(
//                 {
//                     fromPubkey: from.publicKey,
//                     toPubkey: to,
//                     lamports: balance - fee
//                 }
//             )
//          );

//          const send = await sendAndConfirmRawTransaction (connection, transaction, [
//             from
//          ]);

// }   
// }

import { 
    Connection, 
    Keypair, 
    PublicKey, 
    sendAndConfirmTransaction, 
    SystemProgram, 
    Transaction,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import walletkey from './wallet.json' assert {type: 'json'};
import 'dotenv/config'

const to = new PublicKey('DXYCBhw2aSYXRkJKX2HY4XpuYmsnN9DvZt5sZZj7Dq73');
const from = Keypair.fromSecretKey(new Uint8Array(walletkey));

const connection = new Connection('https://api.devnet.solana.com');
console.log({ to, from });

const transfer = async () => {
    const balance = await connection.getBalance(from.publicKey); // Added await to correctly fetch balance
    console.log(balance);

    const sendSol = async () => {
        let transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance
            })
        );
        
        transaction.feePayer = from.publicKey;
        const recentBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = recentBlockhash.blockhash;

        transaction.instructions.pop()

        const { value: fee } = await connection.getFeeForMessage(
            transaction.compileMessage(), 
            'confirmed'
        ) || { value: 0 };

        
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance - fee
            })
        );

        const send = await sendAndConfirmTransaction(
            connection, 
            transaction,
            [from]
        );

        console.log('Transaction successful with signature:', send);
    }

    

    if (balance === 0) {
        console.log('broke in sol, you will be sent some airdrops');
            const connection = new Connection(process.env.devnet_rpc, "confirmed");
            const myPublicKey = from.publicKey; 
            const lamports = LAMPORTS_PER_SOL * 0.2;
            const signature = await connection.requestAirdrop(myPublicKey, lamports);
            await connection.confirmTransaction(signature);

    } else {
       sendSol()
    }   
};

transfer().catch(err => {
    console.error('Transaction failed:', err);
});
