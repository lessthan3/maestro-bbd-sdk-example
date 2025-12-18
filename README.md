# Maestro BBD SDK Example

A minimal example application demonstrating how to integrate the Maestro Web SDK into a React application.

## Prerequisites

- Node.js 16+
- Yarn
- React >=16

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/lessthan3/maestro-bbd-sdk-example.git
cd maestro-bbd-sdk-example
```

2. Install dependencies:

```bash
yarn
```

3. Start the development server:

```bash
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
maestro-bbd-sdk-example/
├── public/
│   └── index.html        # HTML template
├── src/
│   ├── index.tsx         # Entry point
│   ├── App.tsx           # Main app with SDK initialization
│   ├── AppDelegate.ts    # SDK delegate implementation
│   ├── VideoPlayer.tsx   # Video player component
│   └── styles.css        # Application styles
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## SDK Integration

See the [`Hello-World`](https://github.com/lessthan3/maestro-bbd-sdk-example/pull/2) PR for a complete example of Maestro SDK integration.

## Available Scripts

- `yarn start` - Start development server
- `yarn build` - Build for production

## License

MIT
