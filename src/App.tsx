import React, { useState, useEffect, useMemo } from 'react';
import { AlertCircle, Heart, Wallet, ExternalLink, CheckCircle, Loader } from 'lucide-react';

// Solana Web3.js and Wallet Adapter
const SOLANA_NETWORK = 'devnet'; // Using devnet for testing

const SolanaDonationApp = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState(null);
  const [selectedCause, setSelectedCause] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');

  // Mock causes (in production, these would have real Solana addresses)
  const causes = [
    {
      id: 1,
      name: "Climate Action Fund",
      description: "Supporting renewable energy projects worldwide",
      address: "8vw2z7Cn2xL4KqNpqY9FvKRb5EJQxkF3h8rPzMg4pump",
      raised: 12.5,
      icon: "🌍"
    },
    {
      id: 2,
      name: "Education for All",
      description: "Providing learning resources to underserved communities",
      address: "9Yz3k8Wm1nH5LrOpqZ0GwLc6FKRylG4i9sSxNh5pump",
      raised: 8.3,
      icon: "📚"
    },
    {
      id: 3,
      name: "Open Source Developers",
      description: "Supporting the builders who build for everyone",
      address: "7Xy4j9Vm2oI6MsNqrA1HxMd7GLSzmH5j0tTyOi6pump",
      raised: 15.7,
      icon: "💻"
    },
    {
      id: 4,
      name: "Healthcare Access",
      description: "Medical supplies and care for those in need",
      address: "6Wx5k0Wn3pJ7NtPrsB2IyNe8HMTzoI6k1uUzPj7pump",
      raised: 6.9,
      icon: "🏥"
    }
  ];

  // Simulate wallet connection (in production, use @solana/wallet-adapter-react)
  const connectWallet = async () => {
    setLoading(true);
    try {
      // Simulate checking for Phantom/Solflare wallet
      if (typeof window.solana === 'undefined') {
        alert('Please install a Solana wallet like Phantom or Solflare to use this app!');
        setLoading(false);
        return;
      }

      // In real implementation:
      // const resp = await window.solana.connect();
      // setWalletAddress(resp.publicKey.toString());
      
      // For demo purposes:
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAddress = "7vw..." + Math.random().toString(36).substring(7);
      setWalletAddress(mockAddress);
      setBalance((Math.random() * 10 + 1).toFixed(2));
      setTxStatus({ type: 'success', message: 'Wallet connected successfully!' });
      setTimeout(() => setTxStatus(null), 3000);
    } catch (error) {
      setTxStatus({ type: 'error', message: 'Failed to connect wallet' });
      setTimeout(() => setTxStatus(null), 3000);
    }
    setLoading(false);
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(null);
    setSelectedCause(null);
    setDonationAmount('');
  };

  const handleDonate = async () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      setTxStatus({ type: 'error', message: 'Please enter a valid amount' });
      setTimeout(() => setTxStatus(null), 3000);
      return;
    }

    if (parseFloat(donationAmount) > parseFloat(balance)) {
      setTxStatus({ type: 'error', message: 'Insufficient balance' });
      setTimeout(() => setTxStatus(null), 3000);
      return;
    }

    setLoading(true);
    try {
      // In real implementation, this would:
      // 1. Create a transaction with web3.js
      // 2. Send SOL to the cause's address
      // 3. Wait for confirmation
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newBalance = (parseFloat(balance) - parseFloat(donationAmount)).toFixed(2);
      setBalance(newBalance);
      
      const mockTx = Math.random().toString(36).substring(2, 15);
      setTxStatus({ 
        type: 'success', 
        message: `Donated ${donationAmount} SOL successfully!`,
        tx: mockTx
      });
      
      // Update cause's raised amount
      const causeIndex = causes.findIndex(c => c.id === selectedCause.id);
      if (causeIndex !== -1) {
        causes[causeIndex].raised += parseFloat(donationAmount);
      }
      
      setDonationAmount('');
      setTimeout(() => {
        setTxStatus(null);
        setSelectedCause(null);
      }, 5000);
    } catch (error) {
      setTxStatus({ type: 'error', message: 'Transaction failed. Please try again.' });
      setTimeout(() => setTxStatus(null), 3000);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
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
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Heart size={32} style={{ color: '#667eea' }} />
              SolDonate
            </h1>
            <p style={{ 
              margin: '0.25rem 0 0 0', 
              color: '#666',
              fontSize: '0.9rem'
            }}>
              Transparent donations on Solana blockchain
            </p>
          </div>
          
          {!walletAddress ? (
            <button
              onClick={connectWallet}
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                transition: 'transform 0.2s',
                opacity: loading ? 0.7 : 1
              }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {loading ? <Loader size={20} className="spin" /> : <Wallet size={20} />}
              Connect Wallet
            </button>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: '#f0f4ff',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#4ade80'
                }} />
                <span style={{ 
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  {walletAddress}
                </span>
                <span style={{
                  background: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  color: '#667eea'
                }}>
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

        {/* Status Messages */}
        {txStatus && (
          <div style={{
            background: txStatus.type === 'success' ? '#d1fae5' : '#fee2e2',
            border: `2px solid ${txStatus.type === 'success' ? '#4ade80' : '#f87171'}`,
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            {txStatus.type === 'success' ? 
              <CheckCircle size={24} style={{ color: '#4ade80', flexShrink: 0 }} /> : 
              <AlertCircle size={24} style={{ color: '#f87171', flexShrink: 0 }} />
            }
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontWeight: '600',
                color: txStatus.type === 'success' ? '#065f46' : '#991b1b',
                marginBottom: '0.25rem'
              }}>
                {txStatus.message}
              </div>
              {txStatus.tx && (
                <a
                  href={`https://explorer.solana.com/tx/${txStatus.tx}?cluster=${SOLANA_NETWORK}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#667eea',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    textDecoration: 'none'
                  }}
                >
                  View on Explorer <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        )}

        {!walletAddress ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '3rem 2rem',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <Wallet size={64} style={{ 
              color: '#667eea',
              margin: '0 auto 1.5rem'
            }} />
            <h2 style={{
              fontSize: '1.75rem',
              margin: '0 0 1rem 0',
              color: '#333'
            }}>
              Connect Your Wallet
            </h2>
            <p style={{
              color: '#666',
              fontSize: '1.1rem',
              maxWidth: '500px',
              margin: '0 auto 2rem',
              lineHeight: '1.6'
            }}>
              Connect your Solana wallet to start making transparent, on-chain donations to causes you care about
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'left'
            }}>
              {['✓ Fully transparent', '✓ On-chain verification', '✓ Low fees', '✓ Instant settlement'].map((feature, i) => (
                <div key={i} style={{
                  background: '#f0f4ff',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  color: '#333'
                }}>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ) : selectedCause ? (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <button
              onClick={() => setSelectedCause(null)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#667eea',
                fontSize: '0.9rem',
                cursor: 'pointer',
                marginBottom: '1rem',
                padding: '0.5rem 0',
                fontWeight: '600'
              }}
            >
              ← Back to causes
            </button>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '2rem'
            }}>
              <div>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {selectedCause.icon}
                </div>
                <h2 style={{
                  fontSize: '2rem',
                  margin: '0 0 0.5rem 0',
                  color: '#333'
                }}>
                  {selectedCause.name}
                </h2>
                <p style={{
                  color: '#666',
                  fontSize: '1.1rem',
                  margin: '0 0 1.5rem 0'
                }}>
                  {selectedCause.description}
                </p>
                
                <div style={{
                  background: '#f0f4ff',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#666',
                    marginBottom: '0.5rem'
                  }}>
                    Total raised
                  </div>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#667eea'
                  }}>
                    {selectedCause.raised.toFixed(2)} SOL
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#999',
                    marginTop: '0.25rem',
                    fontFamily: 'monospace'
                  }}>
                    {selectedCause.address}
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '0.5rem'
                  }}>
                    Donation Amount (SOL)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="0.00"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      fontSize: '1.25rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      marginBottom: '1rem',
                      fontFamily: 'monospace',
                      boxSizing: 'border-box'
                    }}
                  />
                  
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {[0.1, 0.5, 1, 2].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount.toString())}
                        style={{
                          background: '#f0f4ff',
                          border: '2px solid #667eea',
                          borderRadius: '8px',
                          padding: '0.5rem 1rem',
                          cursor: 'pointer',
                          fontWeight: '600',
                          color: '#667eea',
                          fontSize: '0.9rem'
                        }}
                      >
                        {amount} SOL
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleDonate}
                    disabled={loading || !donationAmount}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '1rem',
                      fontSize: '1.1rem',
                      cursor: loading || !donationAmount ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                      opacity: loading || !donationAmount ? 0.5 : 1,
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => !loading && donationAmount && (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {loading ? (
                      <>
                        <Loader size={20} className="spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Heart size={20} />
                        Donate {donationAmount || '0'} SOL
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 style={{
              color: 'white',
              fontSize: '1.75rem',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Choose a Cause
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {causes.map(cause => (
                <div
                  key={cause.id}
                  onClick={() => setSelectedCause(cause)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '2px solid transparent'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.borderColor = '#667eea';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem'
                  }}>
                    {cause.icon}
                  </div>
                  <h3 style={{
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.25rem',
                    color: '#333'
                  }}>
                    {cause.name}
                  </h3>
                  <p style={{
                    color: '#666',
                    fontSize: '0.9rem',
                    margin: '0 0 1rem 0',
                    lineHeight: '1.5'
                  }}>
                    {cause.description}
                  </p>
                  <div style={{
                    background: '#f0f4ff',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '0.8rem',
                      color: '#666'
                    }}>
                      Raised
                    </span>
                    <span style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#667eea'
                    }}>
                      {cause.raised.toFixed(2)} SOL
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.9rem'
        }}>
          <p>Built on Solana • All transactions are transparent and verifiable on-chain</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
            Network: {SOLANA_NETWORK.toUpperCase()}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SolanaDonationApp;