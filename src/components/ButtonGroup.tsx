import { WalletModalProvider, WalletMultiButton, WalletConnectButton, WalletDisconnectButton, WalletIcon, WalletModal, WalletModalButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import React from 'react';
import { FC } from "react";

export const ButtonGroup: FC = () => {
    return (
        <div className='navbar-buttonGroup'>
            <WalletMultiButton />
            {/* <WalletConnectButton /> */}
            {/* <WalletDisconnectButton /> */}
            {/* <WalletModalButton /> */}
        </div>)
};
