# SolDonate - Solana Micro-Donations Platform

A transparent donation platform built on Solana blockchain where users can make on-chain donations to various causes.

## Quick Deploy (Production-Ready Version)

### Option 1: Deploy to Vercel (Fastest - 5 minutes)

1. **Install dependencies:**
```bash
npm create vite@latest soldonate -- --template react
cd soldonate
npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/wallet-adapter-base lucide-react
```

2. **Replace `src/App.jsx` with the provided `solana-donations.jsx`**

3. **Deploy:**
```bash
npm install -g vercel
vercel
```

### Option 2: Full Production Setup with Real Wallet Integration

**Install Solana dependencies:**
```bash
npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/wallet-adapter-base
```

**Update the app to use real Phantom wallet:**

Replace the mock `connectWallet` function with:

```javascript
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

// In your component:
const { publicKey, sendTransaction, connected } = useWallet();
const connection = new Connection(clusterApiUrl('devnet'));

// Real donation function:
const handleDonate = async () => {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(selectedCause.address),
      lamports: parseFloat(donationAmount) * LAMPORTS_PER_SOL,
    })
  );
  
  const signature = await sendTransaction(transaction, connection);
  await connection.confirmTransaction(signature, 'confirmed');
  // Transaction confirmed!
};
```

## What's Included (Current Demo)

**Beautiful UI** with gradient design
**Wallet connection** simulation (ready for real integration)
**Multiple causes** with tracking
**Transaction status** notifications
**Responsive design** for mobile/desktop
**Balance display** and validation
**Quick-donate** preset buttons

## To Make It Production-Ready (Add These)

### 1. Real Solana Program (Smart Contract)
```bash
# Install Anchor framework
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
anchor init donation_program
```

**Smart contract features to add:**
- Escrow accounts for causes
- Admin verification for causes
- Donation receipts (NFTs)
- Fee collection mechanism
- Refund functionality

### 2. Backend API (Optional but Recommended)
- Store cause metadata
- Track donation history
- Generate analytics
- Verify cause legitimacy

### 3. Enhanced Features
- [ ] Multi-sig for cause withdrawals
- [ ] Donation receipts as NFTs
- [ ] Social sharing of donations
- [ ] Recurring donations via time-locked accounts
- [ ] DAO governance for adding causes
- [ ] Tax receipt generation
- [ ] Integration with charitable organization APIs

## Hackathon Submission Checklist

- [ ] **Live Demo**: Deploy to Vercel/Netlify
- [ ] **Video Demo**: 2-3 minute walkthrough
- [ ] **GitHub Repo**: Clean README with setup instructions
- [ ] **Real Wallet Integration**: Works with Phantom/Solflare
- [ ] **Devnet Testing**: Fully functional on Solana devnet
- [ ] **Unique Feature**: What makes your app special?
- [ ] **Social Impact**: Clear value proposition

## Quick Wins to Stand Out

1. **Add NFT Receipts**: Mint an NFT for each donation as a receipt
2. **Leaderboard**: Show top donors (anonymous or wallet-based)
3. **Impact Metrics**: Show what donations achieve (e.g., "Your 1 SOL = 10 meals")
4. **Cause Verification**: Integration with real charities
5. **Matching Campaigns**: Platform matches donations during special events
6. **Mobile-First**: PWA with offline support

## Network Configuration

**Current**: Devnet (for testing)
**Production**: Switch to mainnet-beta

```javascript
const SOLANA_NETWORK = process.env.REACT_APP_SOLANA_NETWORK || 'devnet';
const connection = new Connection(clusterApiUrl(SOLANA_NETWORK));
```

## Documentation for Judges

Include in your submission:
1. **Problem Statement**: Lack of transparency in donations
2. **Solution**: Blockchain-based transparent donation platform
3. **Technical Stack**: React + Solana Web3.js + Wallet Adapter
4. **Innovation**: [Your unique features]
5. **Impact**: [Social/charitable impact metrics]

## Important Notes

- **Wallet Required**: Users need Phantom, Solflare, or compatible Solana wallet
- **Gas Fees**: Solana transactions are cheap (~$0.00025) but users need SOL
- **Testing**: Use devnet for testing - get free SOL from https://solfaucet.com
- **Security**: Never store private keys, always use wallet adapters

## 30-Minute Enhancement Plan

If you have extra time:

**Minute 0-10**: Add real Phantom wallet integration
**Minute 10-20**: Deploy to Vercel with custom domain
**Minute 20-30**: Create demo video and GitHub README

## Resources

- [Solana Cookbook](https://solanacookbook.com/)
- [Wallet Adapter Docs](https://github.com/solana-labs/wallet-adapter)
- [Solana Web3.js Docs](https://solana-labs.github.io/solana-web3.js/)
- [Anchor Framework](https://www.anchor-lang.com/)

## Contact & Support

- Solana Discord: https://discord.gg/solana
- Colosseum Discord: https://discord.gg/colosseum

---

**Built for Colosseum Hackathon 2026**
Good luck! 🚀