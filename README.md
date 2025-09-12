# Raco Hotels Customer Portal

A modern Next.js hotel customer portal deployed on Cloudflare Workers using OpenNext. This
application provides a beautiful, responsive interface for hotel customers to browse and interact
with Raco Hotels services.

## 🚀 Features

- **Modern UI/UX**: Built with Next.js 15 and Tailwind CSS
- **Cross-Platform Deployment**: Works on Windows, Linux, and macOS
- **Edge Runtime**: Deployed on Cloudflare Workers for global performance
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first approach with dark mode support

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher)
- **Yarn** (v4.6.0 or higher) - package manager
- **Wrangler CLI** - Cloudflare Workers CLI tool

### Installing Prerequisites

#### Windows

```powershell
# Install Node.js from https://nodejs.org/
# Install Yarn
npm install -g yarn

# Install Wrangler
npm install -g wrangler
```

#### macOS

```bash
# Using Homebrew
brew install node yarn

# Install Wrangler
npm install -g wrangler
```

#### Linux (Ubuntu/Debian)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn
npm install -g yarn

# Install Wrangler
npm install -g wrangler
```

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd raco-hotels-fe

# Install dependencies (works on all platforms)
yarn install
```

### 2. Configure Cloudflare

Before deploying, you need to authenticate with Cloudflare:

```bash
# Login to Cloudflare (opens browser - works on all platforms)
wrangler login

# Verify your authentication
wrangler whoami
```

### 3. Environment Configuration

The project is pre-configured with sensible defaults. The main configuration files are:

- `wrangler.jsonc` - Cloudflare Workers configuration
- `open-next.config.ts` - OpenNext configuration for Cloudflare
- `next.config.ts` - Next.js configuration

## 🚀 Development

### Local Development

```bash
# Start development server (all platforms)
yarn dev
```

The application will be available at `http://localhost:3000`

### Production Build (Local)

```bash
# Build the application
yarn build

# Start production server locally
yarn start
```

## 📦 Deployment to Cloudflare Workers

### Quick Deployment

The easiest way to deploy your hotel portal to Cloudflare Workers:

```bash
# Option 1: Use create-cloudflare (recommended for new deployments)
npx create-cloudflare@latest --framework=next --platform=workers --existing

# Option 2: Build and deploy manually
yarn build
npx wrangler deploy
```

### Step-by-Step Deployment

For manual control over the deployment process:

```bash
# 1. Build the Next.js application
yarn build

# 2. Login to Cloudflare (first time only)
npx wrangler login

# 3. Preview locally (optional)
npx wrangler dev

# 4. Deploy to production
npx wrangler deploy
```

### Development vs Deployment

For teams using yarn for development:

```bash
# Development (use yarn)
yarn dev          # Start development server
yarn build        # Build for production
yarn lint         # Run linting

# Deployment (use npx/wrangler)
npx wrangler login    # Authenticate with Cloudflare
npx wrangler deploy   # Deploy to production
```

### Deployment Environments

The project supports multiple environments:

- **Development**: `yarn dev` - Local development
- **Preview**: `yarn deploy:preview` - Cloudflare preview environment
- **Production**: `yarn deploy:production` - Production environment

## 🔧 Available Scripts

| Script                | Description                          | Platform Support |
| --------------------- | ------------------------------------ | ---------------- |
| `yarn dev`            | Start development server             | ✅ All           |
| `yarn build`          | Build Next.js application            | ✅ All           |
| `yarn start`          | Start production server locally      | ✅ All           |
| `yarn lint`           | Run ESLint                           | ✅ All           |
| `npx wrangler login`  | Authenticate with Cloudflare         | ✅ All           |
| `npx wrangler deploy` | Deploy to Cloudflare Workers         | ✅ All           |
| `npx wrangler dev`    | Preview locally with Workers runtime | ✅ All           |
| `yarn cf-typegen`     | Generate Cloudflare types            | ✅ All           |

## 🏗️ Project Structure

```
raco-hotels-fe/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page (main customer portal)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── public/                # Static assets
├── .open-next/           # Generated Cloudflare build (auto-generated)
├── package.json          # Dependencies and scripts
├── wrangler.jsonc        # Cloudflare Workers config
├── open-next.config.ts   # OpenNext configuration
├── next.config.ts        # Next.js configuration
└── README.md            # This file
```

## 🌍 Cross-Platform Compatibility

This project is designed to work seamlessly across different operating systems:

### Windows Users

- All commands work in PowerShell, Command Prompt, or Git Bash
- No additional Windows-specific setup required
- WSL (Windows Subsystem for Linux) is supported but not required

### macOS Users

- Works with Terminal, iTerm2, or any shell
- Homebrew installation recommended but not required

### Linux Users

- Compatible with all major distributions
- Package manager agnostic (works with apt, yum, pacman, etc.)

## 🔍 Troubleshooting

### Common Issues

1. **"wrangler: command not found"**

   ```bash
   # Install Wrangler globally
   npm install -g wrangler
   ```

2. **Authentication issues**

   ```bash
   # Re-login to Cloudflare
   wrangler logout
   wrangler login
   ```

3. **Build failures**

   ```bash
   # Clear cache and reinstall
   rm -rf node_modules .next .open-next
   yarn install
   yarn build:cf
   ```

4. **Permission errors (Linux/macOS)**
   ```bash
   # If you get permission errors, don't use sudo with npm/yarn
   # Instead, configure npm to use a different directory
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   # Add ~/.npm-global/bin to your PATH
   ```

### Platform-Specific Notes

- **Windows**: Use forward slashes (/) in commands, they work in all Windows terminals
- **macOS**: Some users may need to install Xcode Command Line Tools: `xcode-select --install`
- **Linux**: Ensure your user has proper permissions for global npm installs

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [OpenNext Cloudflare Documentation](https://opennext.js.org/cloudflare)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Team Collaboration

Since your team uses different operating systems:

1. **Consistent Commands**: All yarn commands work identically across platforms
2. **Version Control**: Ensure `.gitignore` includes platform-specific files
3. **Environment Variables**: Use `.env.local` for local development (not committed)
4. **Node Version**: Consider using `.nvmrc` to lock Node.js version across team

## 📞 Support

If you encounter any deployment issues:

1. Check the troubleshooting section above
2. Verify all prerequisites are installed correctly
3. Ensure you're authenticated with Cloudflare
4. Check Cloudflare Workers dashboard for deployment logs

---

**Ready to deploy?** Run `yarn deploy` and your hotel customer portal will be live on Cloudflare
Workers! 🎉
