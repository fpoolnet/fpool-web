# Flokicoin

Flokicoin is a Layer 1 decentralized, community-driven blockchain focused on transparency, self-custody, and innovation.

## Overview

- Layer 1 blockchain
- Scrypt-based (merged mining)
- 1-minute block time
- Halving every 210,000 blocks
- No transaction tax
- DAO governance
- Taproot & Lightning support

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/flokiorg/your-flokicoin-app.git
cd your-flokicoin-app
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Then open your browser at `http://localhost:3000`.

### Build for Production

To build the project for production:

```bash
npm run build
```

### Test Production Build Locally

After building, you can serve the static files using `serve`:

```bash
npm run serve
```

This will start a server at `http://localhost:3000` serving the `out` directory.

### Linting

Run ESLint to check for code issues:

```bash
npm run lint
```

## Contributing

Contributions are welcome. Please fork the repository and open a pull request with your changes.

## License

MIT License.
