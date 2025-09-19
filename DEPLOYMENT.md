# Vercel Deployment Guide for Secure Voyage Chain

## Step-by-Step Manual Deployment Instructions

### Prerequisites
- GitHub account
- Vercel account
- Node.js 18+ installed locally (for testing)

### Step 1: Prepare the Repository
1. Ensure all code is committed and pushed to GitHub
2. Verify the repository is public or you have access to deploy private repos
3. Check that all environment variables are documented in `env.example`

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" or "Import Project"
4. Select "Import Git Repository"
5. Find and select `RobinTian1820/secure-voyage-chain`
6. Click "Import"

### Step 3: Configure Project Settings
1. **Project Name**: `secure-voyage-chain` (or your preferred name)
2. **Framework Preset**: Vite
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 4: Set Environment Variables
In the Vercel dashboard, go to Settings > Environment Variables and add:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLETCONNECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_KEY
```

**Note**: Replace `YOUR_INFURA_KEY` and `YOUR_WALLETCONNECT_ID` with your actual API keys.

**Important**: Use `NEXT_PUBLIC_` prefix for all environment variables in Vercel, even though this is a Vite project.

### Step 5: Configure Build Settings
1. Go to Settings > General
2. Set **Node.js Version**: 18.x
3. Set **Build Command**: `npm run build`
4. Set **Output Directory**: `dist`
5. Set **Install Command**: `npm install`

### Step 6: Deploy
1. Click "Deploy" button
2. Wait for the build process to complete
3. Check the deployment logs for any errors
4. Once successful, you'll get a deployment URL

### Step 7: Custom Domain (Optional)
1. Go to Settings > Domains
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel
4. Wait for SSL certificate to be issued

### Step 8: Verify Deployment
1. Visit your deployment URL
2. Test wallet connection functionality
3. Verify all pages load correctly
4. Check that environment variables are properly loaded

### Troubleshooting

#### Build Failures
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check for TypeScript errors
- Ensure environment variables are set correctly

#### Runtime Errors
- Verify wallet connection configuration
- Check RPC URL accessibility
- Ensure all required environment variables are set
- Check browser console for errors

#### Performance Issues
- Enable Vercel Analytics
- Check bundle size
- Optimize images and assets
- Consider enabling Vercel Edge Functions

### Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum Sepolia chain ID | Yes |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint for blockchain | Yes |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `NEXT_PUBLIC_INFURA_API_KEY` | Infura API key | Yes |

### Post-Deployment Checklist
- [ ] Application loads without errors
- [ ] Wallet connection works
- [ ] All pages are accessible
- [ ] Environment variables are loaded
- [ ] Custom domain is configured (if applicable)
- [ ] SSL certificate is active
- [ ] Analytics are enabled (optional)

### Monitoring and Maintenance
1. Set up Vercel Analytics for performance monitoring
2. Configure error tracking (Sentry, etc.)
3. Set up automated deployments from main branch
4. Monitor build logs for any issues
5. Keep dependencies updated regularly

### Support
- Vercel Documentation: https://vercel.com/docs
- Vite Documentation: https://vitejs.dev/guide/
- RainbowKit Documentation: https://www.rainbowkit.com/docs/introduction
