![RoboCrop Logo](src/assets/images/roboCropLogo.png)

<!-- ![RoboCrop Logo](icons/logo_96.png) -->

## Overview

RoboCrop is a Firefox extension designed to detect and eliminate invisible or special characters often inserted by AI systems in text. These characters can cause formatting issues, affect copy-pasting, and get your text flagged by detection software. The extension scans web pages and highlights problematic characters, allowing users to eliminate them with a single click.

## Features

- **Character Detection**: Scans web pages for invisible or problematic characters
- **Visual Highlighting**: Highlights detected characters with futuristic crosshairs and a CRT-style effect
- **Character Information**: Provides detailed information about each detected character via tooltips
- **One-Click Elimination**: Replaces problematic characters with appropriate alternatives
- **Customizable Filters**: Configure which types of characters to detect:
  - **Hidden/Control Characters**: Zero-width spaces, joiners, and other invisible formatting characters
  - **Variation Selectors**: Unicode characters that modify the appearance of preceding characters
  - **Special Spaces**: Non-standard space characters like non-breaking spaces, hair spaces, etc.
  - **Fancy Dashes**: Em dashes, en dashes, and other dash variants

## How It Works

1. **Scan**: Click the "Scan" button to detect special characters on the current page
2. **Review**: Identified characters are highlighted with green crosshairs and labeled
3. **Eliminate**: Click the "Eliminate" button to replace all highlighted characters with appropriate alternatives

## Installation

1. Download the extension from [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/robocrop/)
2. Firefox will ask for confirmation to install the extension
3. Once installed, the RoboCrop icon will appear in your browser toolbar

## Usage

1. Navigate to a web page you suspect contains invisible characters
2. Click the RoboCrop icon in your toolbar to open the extension popup
3. Select which character types you want to detect (all are selected by default)
4. Click "Scan" to detect characters on the page
5. Review the highlighted characters (hover over highlights to see character details)
6. Click "Eliminate" to replace all highlighted characters

## Permissions

RoboCrop requires the following permissions to function properly:

- **`activeTab`**: Allows the extension to access and modify content on the currently active tab when you click the extension icon. This is essential for scanning and highlighting characters on the page you're viewing.

- **`tabs`**: Enables the extension to interact with browser tabs and detect when you navigate to different pages. This allows RoboCrop to maintain state across different websites and provide consistent functionality.

- **`storage`**: Permits the extension to save your preferences (which character types to detect) locally in your browser. Your settings are stored only on your device and are never transmitted elsewhere.

These permissions follow the principle of least privilege - RoboCrop only requests access to what it absolutely needs to provide its core functionality of detecting and eliminating problematic characters.

## Planned Features

- **Advanced Settings**: Granular control over individual character detection and replacement rules. Users will be able to specify custom replacement characters for each type of problematic character detected.

- **Visual Effects Toggle**: Option to enable/disable the CRT-style visual effects and crosshair highlighting for users who prefer minimal visual feedback.

- **Background Monitoring**: Implementation of background script functionality to automatically watch for new page loads and scan content without user intervention. This will include:

  - Automatic scanning of newly loaded pages
  - Visual feedback via the toolbar icon when problematic characters are detected
  - Optional auto-replacement of detected characters
  - Character count badges on the extension icon

- **Staggered Targeting**: Enhanced visual effects with staggered highlighting animations for a more engaging user experience when multiple characters are detected.

## Known Issues

- **Effect Persistence**: Clicking outside the popup when visual effects are active will remove the highlighting effects. This is intended behavior, but can be inadvertently bypassed by right-clicking first instead of left-clicking, which may cause the effects to persist unexpectedly.

## Development

### Prerequisites

- Firefox browser
- Node.js and npm (for building from source)

### Building from Source

1. Clone the repository
   ```
   git clone https://github.com/Skycat1983/firefox_extension.git
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Build the extension
   ```
   npm run build
   ```
4. Load the extension in Firefox:
   - Navigate to `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file from the project directory

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

Developed by [Skycat1983](https://github.com/Skycat1983)
