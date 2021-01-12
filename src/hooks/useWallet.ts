import { ethers, Wallet } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { Ethereum } from "./global";

function isEthereum(e?: Ethereum): e is Ethereum {
  return e?.request !== undefined;
}

export function useWallet() {
  const [isMetamaskInstalled, toggleIsMetaMaskInstalled] = useState(false);
  const [isConnected, toggleConnect] = useState(false);
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >();
  const [selectedAddress, updateSelected] = useState<string | undefined>();
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      toggleIsMetaMaskInstalled(true);
      window.ethereum?.on("accountsChanged", (accounts: string[]) => {
        console.log("accountsChanged", accounts);
        if (accounts.length === 0) {
          // locked
          toggleConnect(false);
          updateSelected(undefined);
        }
        toggleConnect(true);
        if (accounts[0] !== selectedAddress) updateSelected(accounts[0]);
      });
    }
  }, [selectedAddress]);
  window.ethereum?.on("accountsChanged", (accounts: string[]) => {
    console.log("accountsChanged", accounts);
    if (accounts.length === 0) {
      // locked
      toggleConnect(false);
    }
    if (accounts[0] !== selectedAddress) updateSelected(accounts[0]);
  });
  useEffect(() => {
    // skip if window.ethereum === undefined
    if (!isEthereum(window.ethereum)) return;
    const { selectedAddress } = window.ethereum;
    if (selectedAddress) {
      toggleConnect(true);
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    }
  }, []);

  async function connect() {
    const accounts = await window.ethereum?.request({
      method: "eth_requestAccounts",
    });
    toggleConnect(true);
    updateSelected(accounts[0]);
    setProvider(new ethers.providers.Web3Provider(window.ethereum as Ethereum));
  }

  return {
    isMetamaskInstalled,
    isConnected,
    connect,
    provider,
    selectedAddress,
  };
}
