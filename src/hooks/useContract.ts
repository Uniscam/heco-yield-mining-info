import React, { useEffect, useState } from "react";
import { Contract, ContractInterface, ethers, Signer } from "ethers";

export function useContract(
  contractInterface: ContractInterface,
  address: string,
  signerOrProvider?: Signer | ethers.providers.Provider
) {
  const [contract, setContract] = useState<Contract>(
    new Contract(address, contractInterface, signerOrProvider)
  );
  useEffect(() => {
    // If address changed, just reattach the new one
    setContract((c) => c.attach(address));
  }, [address]);

  useEffect(() => {
    if (signerOrProvider) setContract((c) => c.connect(signerOrProvider));
  }, [signerOrProvider]);

  return contract;
}
