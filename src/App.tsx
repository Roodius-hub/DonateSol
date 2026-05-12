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
      description:
        'Providing learning resources to underserved communities',
      address: '9Yz3k8Wm1nH5LrOpqZ0GwLc6FKRylG4i9sSxNh5pump',
      raised: 8.3,
      icon: '📚'
    },
    {
      id: 3,
      name: 'Open Source Developers',
      description:
        'Supporting the builders who build for everyone',
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
          'Please install a Solana wallet like Phantom or Solflare!'
        );

        setLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1200));

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

      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setTxStatus({
      type: 'success',
      message: `Successfully donated ${donationAmount} SOL`
    });

    setLoading(false);

    setDonationAmount('');
  };

  // ================= UI =================

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, #8b5cf6 0%, #6366f1 35%, #0f172a 100%)',
        padding: '2rem 1rem',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Background Blur Effects */}

      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '9999px',
          background: 'rgba(255,255,255,0.08)',
          filter: 'blur(80px)',
          top: '-120px',
          left: '-120px'
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '9999px',
          background: 'rgba(99,102,241,0.25)',
          filter: 'blur(100px)',
          bottom: '-100px',
          right: '-100px'
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* HEADER */}

        <div
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '28px',
            padding: '1.5rem 2rem',
            marginBottom: '2rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
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
                fontSize: '2.6rem',
                fontWeight: '800',
                letterSpacing: '-1px',
                color: 'white',
                textShadow: '0 10px 40px rgba(0,0,0,0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem'
              }}
            >
              <Heart size={38} color="#c084fc" />
              SolDonate
            </h1>

            <p
              style={{
                color: 'rgba(255,255,255,0.75)',
                marginTop: '0.5rem'
              }}
            >
              Transparent blockchain donations powered by Solana
            </p>
          </div>

          {!walletAddress ? (
            <button
              onClick={connectWallet}
              disabled={loading}
              style={{
                background:
                  'linear-gradient(135deg,#8b5cf6,#6366f1)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                padding: '0.9rem 1.8rem',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                boxShadow:
                  '0 10px 30px rgba(99,102,241,0.45)',
                transition: 'all 0.25s ease'
              }}
            >
              {loading ? (
                <Loader className="spin" size={22} />
              ) : (
                <Wallet size={22} />
              )}

              Connect Wallet
            </button>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  padding: '0.8rem 1rem',
                  borderRadius: '14px',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                {walletAddress} • {balance} SOL
              </div>

              <button
                onClick={disconnectWallet}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '0.7rem 1rem',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {/* STATUS */}

        {txStatus && (
          <div
            style={{
              background:
                txStatus.type === 'success'
                  ? 'rgba(34,197,94,0.15)'
                  : 'rgba(239,68,68,0.15)',
              border: `1px solid ${
                txStatus.type === 'success'
                  ? 'rgba(34,197,94,0.4)'
                  : 'rgba(239,68,68,0.4)'
              }`,
              color: 'white',
              borderRadius: '18px',
              padding: '1rem 1.2rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              backdropFilter: 'blur(12px)'
            }}
          >
            {txStatus.type === 'success' ? (
              <CheckCircle color="#4ade80" />
            ) : (
              <AlertCircle color="#f87171" />
            )}

            <div style={{ fontWeight: 600 }}>
              {txStatus.message}
            </div>
          </div>
        )}

        {/* TITLE */}

        <div
          style={{
            textAlign: 'center',
            marginBottom: '2.5rem'
          }}
        >
          <h2
            style={{
              color: 'white',
              fontSize: '2.2rem',
              marginBottom: '0.8rem'
            }}
          >
            Choose a Cause
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Support impactful global initiatives using fast,
            transparent, low-fee Solana blockchain donations.
          </p>
        </div>

        {/* CAUSE CARDS */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(280px,1fr))',
            gap: '1.8rem'
          }}
        >
          {causes.map((cause) => (
            <div
              key={cause.id}
              onClick={() => setSelectedCause(cause)}
              style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                padding: '1.8rem',
                transition: 'all 0.3s ease',
                boxShadow:
                  '0 10px 30px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              {/* Top Glow */}

              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '5px',
                  background:
                    'linear-gradient(90deg,#8b5cf6,#06b6d4)'
                }}
              />

              <div
                style={{
                  fontSize: '3.5rem',
                  marginBottom: '1rem'
                }}
              >
                {cause.icon}
              </div>

              <h3
                style={{
                  fontSize: '1.35rem',
                  marginBottom: '0.7rem'
                }}
              >
                {cause.name}
              </h3>

              <p
                style={{
                  color: 'rgba(255,255,255,0.72)',
                  lineHeight: 1.6,
                  minHeight: '70px'
                }}
              >
                {cause.description}
              </p>

              <div
                style={{
                  marginTop: '1.4rem',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '14px',
                  padding: '0.9rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span
                  style={{
                    color: 'rgba(255,255,255,0.65)'
                  }}
                >
                  Raised
                </span>

                <strong
                  style={{
                    fontSize: '1.1rem'
                  }}
                >
                  {cause.raised.toFixed(2)} SOL
                </strong>
              </div>
            </div>
          ))}
        </div>

        {/* DONATION MODAL */}

        {selectedCause && (
          <div
            style={{
              marginTop: '2rem',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '28px',
              padding: '2rem',
              color: 'white',
              boxShadow:
                '0 10px 40px rgba(0,0,0,0.25)'
            }}
          >
            <h2
              style={{
                fontSize: '2rem',
                marginBottom: '0.7rem'
              }}
            >
              {selectedCause.icon} {selectedCause.name}
            </h2>

            <p
              style={{
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '1.5rem'
              }}
            >
              {selectedCause.description}
            </p>

            <input
              type="number"
              value={donationAmount}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement>
              ) => setDonationAmount(e.target.value)}
              placeholder="Enter SOL amount"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.06)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                marginBottom: '1rem'
              }}
            />

            <button
              onClick={handleDonate}
              disabled={loading}
              style={{
                background:
                  'linear-gradient(135deg,#8b5cf6,#6366f1)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                padding: '1rem 1.8rem',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow:
                  '0 10px 30px rgba(99,102,241,0.45)'
              }}
            >
              {loading ? (
                <>
                  <Loader
                    size={18}
                    className="spin"
                  />{' '}
                  Processing...
                </>
              ) : (
                <>
                  <Heart size={18} /> Donate Now
                </>
              )}
            </button>
          </div>
        )}

        {/* FOOTER */}

        <div
          style={{
            marginTop: '4rem',
            textAlign: 'center',
            color: 'rgba(255,255,255,0.65)'
          }}
        >
          <p>
            Built on Solana • Transparent On-chain Donations
          </p>

          <p style={{ marginTop: '0.5rem' }}>
            Network: {SOLANA_NETWORK}
          </p>
        </div>
      </div>

      {/* SPIN ANIMATION */}

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SolanaDonationApp;