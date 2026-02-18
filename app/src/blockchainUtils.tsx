import { BrowserProvider, Contract, ethers, Signer } from "ethers";

const contractAddress = "0x4235dF1A80fe35b51e26Bf9E3cf5BDC8eE5f8BB1"; // Replace with your contract address
const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "petId",
          "type": "uint256"
        }
      ],
      "name": "adopt",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAdopters",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getPets",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

declare global {
  interface Window {
    ethereum?: any;
  }
}

const getProvider = (): BrowserProvider | null => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }
  return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async (): Promise<Signer | null> => {
  try {
    const provider = getProvider();
    return provider ? await provider.getSigner() : null;
  } catch (error) {
    console.error("MetaMask connection error:", error);
    return null;
  }
};

export const getContract = async (): Promise<Contract | null> => {
  const signer = await getSigner();
  return signer ? new Contract(contractAddress, abi, signer) : null;
};

const withContract = async (
  action: (contract: Contract) => any,
): Promise<any | void> => {
  const contract = await getContract();
  if (!contract) return;
  try {
    return await action(contract);
  } catch (error) {
    console.error("Contract interaction error:", error);
  }
};

export const adopt = async (petId: number): Promise<void> => {
  await withContract(async (contract) => {
    console.log("acting...");
    const tx = await contract.adopt(petId);
    await tx.wait();
    console.log("Transaction completed!");
  });
};

export const getPets = async () => {
  return withContract(async (contract) => {
    const result: bigint[] = await contract.getPets(); // Fetch data
    const ids = result.map((num) => Number(num)); // Convert from BigInt to number
    console.log(ids);

    return ids;
  });
};

// export const getMyBalance = async () => {
//     const provider = getProvider();
//     const signer = await getSigner();
//     const balance = await provider.getBalance(signer.getAddress());
//     return ethers.formatEther(balance);
// };

// export const getWinner = async () => {
//     return withContract(async (contract) => {
//         const tx = await contract.getWinner();
//         tx.wait();
//         console.log(tx);

//     });
// };
