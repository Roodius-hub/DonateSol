import React, { useState } from 'react';
import {
  AlertCircle,
  Heart,
  Wallet,
  ExternalLink,
  CheckCircle,
  Loader
} from 'lucide-react';

// ================= TYPES =================

type TxStatusType = 'success' | 'error';

interface TxStatus {
  type: TxStatusType;
  message: string;
  tx?: string;
}

interface Cause {
  id: number;
  name: string;
  description: string;
  address: string;
  raised: number;
  icon: string;
}

declare global {
  interface Window {
    solana?: {
      connect: () => Promise<{
        publicKey: {
          toString(): string;
        };
      }>;
    };
  }
}

// ================= CONSTANTS =================

const SOLANA_NETWORK = 'devnet';

// ================= COMPONENT =================

const SolanaDonationApp: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const [balance, setBalance] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [txStatus, setTxStatus] = useState<TxStatus | null>(null);

  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);

  const [donationAmount, setDonationAmount] = useState<string>('');

  // ================= MOCK DATA =================

  const causes: Cause[] = [
    {
      id: 1,
      name: 'Climate Action Fund',
      description: 'Supporting renewable energy projects worldwide',
      address: '8vw2z7Cn2xL4KqNpqY9FvKRb5EJQxkF3h8rPzMg4pump',
      raised: 12.5,
      icon: '🌍'
    },
    {
      id: 2,
      name: 'Education for All',
      description: 'Providing learning resources to underserved communities',
      address: '9Yz3k8Wm1nH5LrOpqZ0GwLc6FKRylG4i9sSxNh5pump',
      raised: 8.3,
      icon: '📚'
    },
    {
      id: 3,
      name: 'Open Source Developers',
      description: 'Supporting the builders who build for everyone',
      address: '7Xy4j9Vm2oI6MsNqrA1HxMd7GLSzmH5j0tTyOi6pump',
      raised: 15.7,
      icon: '💻'
    },
    {
      id: 4,
      name: 'Healthcare Access',
      description: 'Medical supplies and care for those in need',
      address: '6Wx5k0Wn3pJ7NtPrsB2IyNe8HMTzoI6k1uUzPj7pump',
      raised: 6.9,
      icon: '🏥'
    }
  ];

  // ================= WALLET =================

  const connectWallet = async (): Promise<void> => {
    setLoading(true);

    try {
      if (typeof window.solana === 'undefined') {
        alert(
          'Please install a Solana wallet like Phantom or Solflare to use this app!'
        );

        setLoading(false);
        return;
      }

      // Real implementation:
      // const resp = await window.solana.connect();
      // setWalletAddress(resp.publicKey.toString());

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockAddress =
        '7vw...' + Math.random().toString(36).substring(7);

      setWalletAddress(mockAddress);

      setBalance((Math.random() * 10 + 1).toFixed(2));

      setTxStatus({
        type: 'success',
        message: 'Wallet connected successfully!'
      });

      setTimeout(() => setTxStatus(null), 3000);
    } catch (error) {
      setTxStatus({
        type: 'error',
        message: 'Failed to connect wallet'
      });

      setTimeout(() => setTxStatus(null), 3000);
    }

    setLoading(false);
  };

  const disconnectWallet = (): void => {
    setWalletAddress(null);
    setBalance(null);
    setSelectedCause(null);
    setDonationAmount('');
  };

  // ================= DONATION =================

  const handleDonate = async (): Promise<void> => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      setTxStatus({
        type: 'error',
        message: 'Please enter a valid amount'
      });

      setTimeout(() => setTxStatus(null), 3000);

      return;
    }

    if (
      balance &&
      parseFloat(donationAmount) > parseFloat(balance)
    ) {
      setTxStatus({
        type: 'error',
        message: 'Insufficient balance'
      });

      setTimeout(() => setTxStatus(null), 3000);

      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (balance) {
        const newBalance = (
          parseFloat(balance) - parseFloat(donationAmount)
        ).toFixed(2);

        setBalance(newBalance);
      }

      const mockTx = Math.random().toString(36).substring(2, 15);

      setTxStatus({
        type: 'success',
        message: `Donated ${donationAmount} SOL successfully!`,
        tx: mockTx
      });

      const causeIndex = causes.findIndex(
        (c) => c.id === selectedCause?.id
      );

      if (causeIndex !== -1) {
        causes[causeIndex].raised += parseFloat(donationAmount);
      }

      setDonationAmount('');

      setTimeout(() => {
        setTxStatus(null);
        setSelectedCause(null);
      }, 5000);
    } catch (error) {
      setTxStatus({
        type: 'error',
        message: 'Transaction failed. Please try again.'
      });

      setTimeout(() => setTxStatus(null), 3000);
    }

    setLoading(false);
  };

  // ================= UI =================

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem 1rem',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '2rem',
                background:
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Heart size={32} style={{ color: '#667eea' }} />
              SolDonate
            </h1>

            <p
              style={{
                margin: '0.25rem 0 0 0',
                color: '#666',
                fontSize: '0.9rem'
              }}
            >
              Transparent donations on Solana blockchain
            </p>
          </div>

          {!walletAddress ? (
            <button
              onClick={connectWallet}
              disabled={loading}
              style={{
                background:
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '600',
                boxShadow:
                  '0 4px 12px rgba(102, 126, 234, 0.4)',
                transition: 'transform 0.2s',
                opacity: loading ? 0.7 : 1
              }}
              onMouseOver={(
                e: React.MouseEvent<HTMLButtonElement>
              ) => {
                if (!loading) {
                  e.currentTarget.style.transform =
                    'translateY(-2px)';
                }
              }}
              onMouseOut={(
                e: React.MouseEvent<HTMLButtonElement>
              ) => {
                e.currentTarget.style.transform =
                  'translateY(0)';
              }}
            >
              {loading ? (
                <Loader size={20} className="spin" />
              ) : (
                <Wallet size={20} />
              )}

              Connect Wallet
            </button>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}
            >
              <div
                style={{
                  background: '#f0f4ff',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#4ade80'
                  }}
                />

                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    color: '#666'
                  }}
                >
                  {walletAddress}
                </span>

                <span
                  style={{
                    background: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    color: '#667eea'
                  }}
                >
                  {balance} SOL
                </span>
              </div>

              <button
                onClick={disconnectWallet}
                style={{
                  background: 'transparent',
                  color: '#666',
                  border: '2px solid #ddd',
                  borderRadius: '12px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {/* Continue with the rest of your JSX exactly the same */}
      </div>
    </div>
  );
};

export default SolanaDonationApp;