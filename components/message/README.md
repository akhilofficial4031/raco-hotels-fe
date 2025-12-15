# Custom Message Component

A custom message notification system that provides the same API as Ant Design's message component
but with full control over styling and behavior.

## Features

- **Same API as Ant Design**: Drop-in replacement for `antd` message component
- **Context-based**: Uses React Context for global state management
- **Customizable**: Full control over styling and animations
- **SSR Safe**: Works with Next.js server-side rendering
- **TypeScript**: Full TypeScript support with proper types

## Usage

### Basic Usage

```tsx
import { message } from "@/components/message";

// Success message
message.success("Operation completed successfully!");

// Error message
message.error("Something went wrong!");

// Warning message
message.warning("Please check your input!");

// Info message
message.info("Here's some information!");

// Loading message (stays until manually dismissed)
message.loading("Loading data...");
```

### With Custom Duration

```tsx
// Custom duration (in milliseconds)
message.success("Quick message!", 1000);
message.error("Error message!", 5000);
```

### Using the Hook (Alternative)

```tsx
import { useMessage } from "@/components/message";

function MyComponent() {
  const message = useMessage();

  const handleClick = () => {
    message.success("Button clicked!");
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

## Setup

The message system is automatically set up in the root layout. The following components are
included:

1. **MessageProvider**: Context provider that manages message state
2. **MessageContainer**: Visual component that renders messages
3. **message**: Global message API object

## Message Types

- `success`: Green success messages (3s default duration)
- `error`: Red error messages (4.5s default duration)
- `warning`: Yellow warning messages (4.5s default duration)
- `info`: Blue info messages (3s default duration)
- `loading`: Gray loading messages (stays until manually dismissed)

## Styling

Messages appear in the top-right corner of the screen with:

- Smooth slide-in animations
- Auto-dismiss functionality (except loading messages)
- Click to dismiss option
- Responsive design
- Proper z-index stacking

## Migration from Ant Design

Simply change the import statement:

```tsx
// Before
import { message } from "antd";

// After
import { message } from "@/components/message";
```

All existing code will continue to work without changes!
