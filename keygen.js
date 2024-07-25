import { Keypair} from '@solana/web3.js'

export const generateKey = () => {
    const wallet = Keypair.generate();

    const publicKey = wallet.publicKey.toBase58();
    const privateKey = wallet.secretKey.toString();

    console.log({privateKey, publicKey});


    return {privateKey, publicKey};
    

}

// generateKey()