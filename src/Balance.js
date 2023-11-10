import React, { Component } from 'react';

import { ethers } from "ethers";

class Balance extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  async getBalance() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const maticProvider = new ethers.getDefaultProvider("matic");
    const token = "0x205FA2dB869370b54B5780f7334AbdD94f0A6c5E";
    const abi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_userAddress",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }    
    ];
    const balanceInterface = new ethers.Interface(abi);
    const balance = ethers.formatUnits((await maticProvider.call({
        data: balanceInterface.encodeFunctionData("balanceOf", ["0x1D95908F5E69A412BAa8E167fF6813E3b3E9Ce47"]),
        to: token
    })), 18);
    console.log("balance", balance);
    this.setState({ selectedAddress: accounts[0], balance : balance })
  }

  renderBalance() {
    if (!this.state.selectedAddress) {
      return (
        <button onClick={() => this.getBalance()}>Get Balance</button>
      )
    } else {
      return (
        <p>Token balance of {this.state.selectedAddress}:  {this.state.balance}</p>
      );
    }
  }

  render() {
    return(
      <div>
        {this.renderBalance()}
      </div>
    )
  }
}

export default Balance;