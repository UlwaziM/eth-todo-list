# Eth-todo-list
Blockchain Todo App Powered by Ethereum Smart Contracts

## Description
This project is a decentralized to-do list application built on the Ethereum blockchain. Unlike traditional web applications that connect to centralized servers, this application connects directly to the Ethereum blockchain, where all data and business logic are stored in smart contracts, ensuring immutability and security.

## Table of Contents
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)
* [Project Overview](#project-overview)
* [Smart Contract Structure](#smart-contract-structure)
* [Testing](#testing)
* [Contributing](#contributing)
* [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed and configured:

### Node.js and npm
Make sure you have Node.js (v12.0.0 or higher) and npm installed on your system.
```bash
# Check Node.js version
node -v

# Check npm version
npm -v
```
If you don't have Node.js installed, download and install it from [nodejs.org](https://nodejs.org/).

### Truffle Framework
Truffle is a development environment, testing framework, and asset pipeline for Ethereum.
```bash
# Install Truffle globally
npm install -g truffle

# Verify installation
truffle version
```

### Ganache
Ganache provides a personal Ethereum blockchain for development purposes.

1. Download Ganache from [trufflesuite.com/ganache](https://trufflesuite.com/ganache/)
2. Install and open the application
3. Create a new workspace (Ethereum workspace)
4. Configure the workspace:
   - Workspace Name: eth-todo-list
   - Server:
     - Port Number: 7545
     - Network ID: 5777
   - Click "Save Workspace"

### MetaMask
MetaMask is a browser extension that allows you to interact with the Ethereum blockchain.

1. Install MetaMask from your browser's extension store or [metamask.io](https://metamask.io/)
2. Set up a new wallet (save your seed phrase securely)
3. Configure MetaMask to connect to your local Ganache blockchain:
   - Click on the network dropdown (usually shows "Ethereum Mainnet")
   - Select "Add Network" or "Custom RPC"
   - Fill in the following details:
     - Network Name: Ganache
     - New RPC URL: http://127.0.0.1:7545
     - Chain ID: 5777
     - Currency Symbol: ETH
   - Click "Save"
4. Import an account from Ganache:
   - In Ganache, click on the key icon next to an account to view its private key
   - In MetaMask, click on your account icon > Import Account
   - Paste the private key and click "Import"

## Installation
Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/eth-todo-list.git
cd eth-todo-list

# Install dependencies
npm install
```

## Usage
To run the application:

1. Start Ganache to run a personal blockchain
2. Compile and migrate the smart contracts:

```bash
truffle compile
truffle migrate --reset
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:3000
5. Make sure MetaMask is connected to your Ganache network and you have selected the imported account

## Project Overview
This application differs from traditional web apps in the following ways:

- **Decentralized Architecture**: The application connects directly to the Ethereum blockchain rather than a centralized server
- **Smart Contracts**: Business logic and data storage are handled by immutable smart contracts deployed on the blockchain
- **Web3 Integration**: The client-side application uses Web3.js to communicate with the blockchain

## Smart Contract Structure
The TodoList smart contract is written in Solidity and includes:

1. **State Variables**:
   - `taskCount`: Tracks the number of tasks
   - `tasks`: Mapping to store task data

2. **Struct Definition**:
   - `Task`: Contains ID, content, and completion status

3. **Events**:
   - `TaskCreated`: Emitted when a new task is added
   - `TaskCompleted`: Emitted when a task's completion status changes

4. **Functions**:
   - `createTask()`: Adds a new task to the mapping
   - `toggleCompleted()`: Changes a task's completion status

## Testing
The project includes tests written with Mocha and Chai. To run the tests:

```bash
truffle test
```

The tests verify:
- Proper deployment of the smart contract
- Task listing functionality
- Task creation with event emission
- Task completion toggling with event emission

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Compile and test the smart contracts (`truffle compile` and `truffle test`)
5. Commit your changes (`git commit -m 'Add new feature'`)
6. Push to the branch (`git push origin feature-branch`)
7. Open a pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Tech Stack
- Solidity - Smart contract programming language
- Truffle - Development framework for Ethereum
- Ganache - Personal blockchain for Ethereum development
- Web3.js - Library for interacting with Ethereum blockchain
- MetaMask - Browser extension for connecting to Ethereum networks