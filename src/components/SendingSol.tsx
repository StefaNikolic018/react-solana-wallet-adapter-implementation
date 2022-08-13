import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature } from "@solana/web3.js";
import React, { FC, useCallback, useState } from "react";
import { notify } from "../utils/notifications";

export default function SendingSol() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    // Need to be logged in with senders wallet to send it not the otherwise
    // My Phantom address
    const [fromAddress, setFromAddress] = useState("4cBNGwzTgzGRqPsj3FCKxyH2kbkWwWD54zYvhkaixHdT");

    // My Solflare address
    const [toAddress, setToAddress] = useState("Cg1zZM2bxU991PNKpdHRbHnTqURCta58TiJdrtgoz8dv");

    // Amount of SOL to send
    const [amount, setAmount] = useState(1);

    const enterAddress = (from: boolean, e: React.ChangeEvent<HTMLInputElement>) => {
        // Need to have debounce here to prevent the address from being set before the user has finished typing
        if (from) {
            setFromAddress(e.target.value);
        } else {
            setToAddress(e.target.value);
        }
    }


    const sendSol = useCallback(async (destAddress: PublicKey, amount: number) => {
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            return;
        }
        console.log(amount);
        let signature: TransactionSignature = '';
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    // fromPubkey: new PublicKey(fromAddress),
                    fromPubkey: publicKey,
                    toPubkey: destAddress,
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );

            signature = await sendTransaction(transaction, connection);

            await connection.confirmTransaction(signature);
            notify({ type: 'success', message: `Transaction successful!`, txid: signature });
        } catch (error: any) {
            notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
            console.log('error', `Transaction failed! ${error?.message}`, signature);
            return;
        }



    }, [connection, publicKey, sendTransaction]);


    return (
        <div className="transfer-box">
            {/* <input type="text" placeholder="From which address" onChange={(e) => { enterAddress(true, e) }} /> */}
            <input type="text" placeholder="Destination address" onChange={(e) => { enterAddress(false, e) }} />
            <input type="number" placeholder="Amount" onChange={(e) => { setAmount(parseInt(e.target.value)) }} min="1" max="1000" value={amount} />
            <button className="px-8 py-3 rounded-xl m-2 btn animate-pulse bg-gradient-to-r from-pink-500 to-yellow-500   hover:from-[#9945FF] hover:to-[#14F195]" onClick={() => { sendSol(new PublicKey(toAddress), amount) }}>Send</button>
        </div>
    )
}
