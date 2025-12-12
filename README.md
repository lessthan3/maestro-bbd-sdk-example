# Maestro BBD SDK Example

A minimal example application demonstrating how to integrate the Maestro Web SDK into a React application.

## Prerequisites

- Node.js 16+
- Yarn

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

3. Configure your Site ID and Event ID in `src/App.tsx`:
```typescript
const SITE_ID = 'YOUR_SITE_ID';
const EVENT_ID = 'YOUR_EVENT_ID';
```

4. Start the development server:
```bash
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
maestro-bbd-sdk-example/
├── public/
│   └── index.html        # HTML template with panel-manager container
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

## SDK Integration Overview

### 1. Install the SDK

```bash
yarn add @maestro_io/maestro-web-sdk
```

### 2. Implement the Delegate

The `AppDelegate` class implements `IMaestroEventDelegate` to handle SDK callbacks:

```typescript
import { IMaestroEventDelegate } from '@maestro_io/maestro-web-sdk';

class AppDelegate implements IMaestroEventDelegate {
  // Authentication methods
  async userIsAuthenticated(): Promise<boolean> { ... }
  async getUserSWID(): Promise<string | null> { ... }
  async getUserToken(): Promise<string | null> { ... }

  // API configuration
  getBettingAPIBaseURL(): string { ... }
  getStatsAPIBaseURL(): string { ... }

  // Video playback callbacks
  playClip(atIndex: number): void { ... }
  dismissClips(): void { ... }

  // Analytics
  trackAction(action: ActionTrackEvent): void { ... }
  trackImpression(impression: ImpressionTrackEvent): void { ... }

  // Panel events
  onPanelEvent(event: PanelEvent): void { ... }
}
```

### 3. Initialize the SDK

```typescript
import SDK from '@maestro_io/maestro-web-sdk';

// 1. Configure with your site ID
SDK.configure({ siteID: 'YOUR_SITE_ID' });

// 2. Start watching an event
const delegate = new AppDelegate();
await SDK.userDidStartWatchingEvent('EVENT_ID', delegate);

// 3. Render panels into a container
const unmount = await SDK.renderPanel('panel-manager');

// 4. Cleanup when done
await unmount();
await SDK.userDidStopWatchingEvent('EVENT_ID');
```

### 4. HTML Setup

Ensure your HTML has a container for the SDK panels:

```html
<div id="panel-manager"></div>
```

## Available Scripts

- `yarn start` - Start development server
- `yarn build` - Build for production

## License

MIT
