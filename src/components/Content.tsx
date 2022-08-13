import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import React, { useEffect, useState } from 'react'
import { RequestAirdrop } from './RequestAirdrop';
import useUserSOLBalanceStore from '../stores/getUserSOLBalance';
import useNotificationStore from '../stores/useNotificationStore';
import SendingSol from './SendingSol';

export default function Content() {
    const [balance, setBalance] = useState(0);
    const [hadAirdrop, setHadAirdrop] = useState(false);

    const { connection } = useConnection();
    const wallet = useWallet();

    const userBalanceStore = useUserSOLBalanceStore();
    const notificationsStore = useNotificationStore();

    // TODO: 
    // 1. Add notification component that slides in on the bottom of the screen
    // 2. Add notification type when we are waiting for the transaction to be confirmed
    // 3. Disable buttons when we are waiting for the transaction to be confirmed
    // 4. Refactor the code

    useEffect(() => {
        if (wallet.publicKey) {
            userBalanceStore.getUserSOLBalance(wallet.publicKey!, connection);
        }
    }, [wallet.publicKey, notificationsStore.notifications.length])

    useEffect(() => {
        console.log(userBalanceStore.balance)
        setBalance(userBalanceStore.balance);
    }, [userBalanceStore.balance])


    useEffect(() => {
        if (notificationsStore.notifications.length > 0) {
            setHadAirdrop(true);
            setTimeout(() => {
                setHadAirdrop(false);
            }, 3000)
        }
    }, [notificationsStore.notifications])

    return (
        <div className='body-content'>
            <RequestAirdrop />
            {wallet.publicKey && <h1>Public key: {wallet.publicKey.toBase58()}</h1>}
            {wallet && <h1>SOL Balance: {balance}</h1>}
            <SendingSol />
            {hadAirdrop && <h2 className={notificationsStore.notifications[notificationsStore.notifications.length - 1].type === 'success' ? 'text-green-500' : 'text-red-500'}>{notificationsStore.notifications[notificationsStore.notifications.length - 1].message}</h2>}
        </div>
    )
}
