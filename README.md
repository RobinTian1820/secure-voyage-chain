# 🚢 Secure Voyage Chain

> **Next-Generation Maritime Logistics Platform**  
> Revolutionizing global shipping with privacy-preserving blockchain technology

## 🌊 What is Secure Voyage Chain?

Secure Voyage Chain is a cutting-edge maritime logistics platform that combines blockchain technology with advanced cryptographic methods to ensure complete privacy and security in global shipping operations. Built for the modern shipping industry, it provides end-to-end encrypted tracking, smart insurance, and transparent supply chain management.

## ✨ Key Features

### 🔐 **Privacy-First Architecture**
- **Zero-Knowledge Data Processing**: All sensitive cargo information remains encrypted throughout the entire journey
- **Homomorphic Encryption**: Perform computations on encrypted data without decryption
- **Privacy-Preserving Analytics**: Generate insights without exposing raw data

### 🌐 **Global Maritime Network**
- **Real-Time Vessel Tracking**: Monitor cargo across oceans with encrypted location data
- **Multi-Port Integration**: Seamless coordination between ports worldwide
- **Weather & Route Optimization**: AI-powered routing with privacy protection

### 💼 **Smart Insurance & Claims**
- **Automated Risk Assessment**: AI-driven risk evaluation using encrypted data
- **Instant Claims Processing**: Blockchain-based claim verification
- **Fraud Prevention**: Cryptographic proof of damage and loss

### 🏆 **Reputation & Trust System**
- **Decentralized Scoring**: Community-driven reputation for shippers and carriers
- **Transparent History**: Immutable records of successful deliveries
- **Trustless Verification**: Cryptographic proof of service quality

## 🛠 Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | React 18 + TypeScript | Modern, type-safe UI development |
| **Styling** | Tailwind CSS + shadcn/ui | Responsive, accessible design system |
| **Blockchain** | Ethereum Sepolia | Decentralized infrastructure |
| **Encryption** | Zama FHE | Privacy-preserving computations |
| **Wallet** | RainbowKit + Wagmi | Multi-wallet connectivity |
| **Smart Contracts** | Solidity 0.8.24 | On-chain business logic |

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0+ 
- **npm** 9.0+ or **yarn** 1.22+
- **Git** 2.30+

### Installation

```bash
# Clone the repository
git clone https://github.com/RobinTian1820/secure-voyage-chain.git
cd secure-voyage-chain

# Install dependencies
npm install

# Configure environment
cp env.example .env.local

# Start development server
npm run dev
```

### Environment Setup

Create `.env.local` with your configuration:

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Integration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLETCONNECT_ID

# API Keys
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

## 🏗 Smart Contract Architecture

### Core Contracts

#### `SecureVoyageChain.sol`
- **Voyage Management**: Create and manage shipping routes
- **Cargo Tracking**: Encrypted shipment data storage
- **Insurance Integration**: Automated claim processing
- **Reputation System**: On-chain trust scoring

#### Key Functions
```solidity
// Create a new shipping voyage
function createVoyage(string memory origin, string memory destination, uint256 duration)

// Add encrypted cargo data
function addShipment(uint256 voyageId, externalEuint32 cargoWeight, externalEuint32 cargoValue)

// Submit insurance claim
function submitInsuranceClaim(uint256 voyageId, euint32 claimAmount, string memory reason)
```

## 🌍 Use Cases

### 🏭 **Manufacturing & Export**
- Track high-value goods from factory to port
- Ensure temperature-sensitive cargo integrity
- Verify authenticity of luxury goods

### 🍎 **Food & Agriculture**
- Monitor cold chain compliance
- Track organic certification
- Prevent food fraud

### 💎 **Precious Materials**
- Secure diamond and gold transport
- Verify conflict-free sourcing
- Track precious metal purity

### 🏥 **Pharmaceuticals**
- Ensure drug authenticity
- Monitor temperature compliance
- Track regulatory compliance

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Application pages
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
└── assets/             # Static assets
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm run preview
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Zama** for FHE technology
- **Ethereum Foundation** for blockchain infrastructure
- **OpenZeppelin** for smart contract security
- **Rainbow** for wallet integration

---

**Built with ❤️ for the future of maritime logistics**
