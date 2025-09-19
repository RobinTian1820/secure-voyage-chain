import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TestWallet = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Wallet Connection Test</CardTitle>
          <CardDescription>
            Test wallet connection functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Connection Status:</h3>
            <p className="text-sm text-muted-foreground">
              {isConnected ? `Connected: ${address}` : 'Not connected'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">RainbowKit Connect Button:</h3>
            <ConnectButton />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Manual Connection:</h3>
            <div className="space-y-2">
              {connectors.map((connector) => (
                <Button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending ? 'Connecting...' : `Connect ${connector.name}`}
                </Button>
              ))}
            </div>
          </div>

          {isConnected && (
            <div>
              <h3 className="font-semibold mb-2">Disconnect:</h3>
              <Button onClick={() => disconnect()} variant="destructive">
                Disconnect
              </Button>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              Error: {error.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TestWallet;
