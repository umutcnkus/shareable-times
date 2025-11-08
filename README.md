# ⏱️ Shareable Times

A beautiful React web application for creating and sharing stopwatches and timers via URL. Perfect for coordinating events, tracking time across teams, or simply sharing countdowns with friends!

## ✨ Features

- **🏃 Stopwatch**: Track elapsed time from a start point
- **⏲️ Timer**: Count down to a specific end time
- **🔗 Shareable URLs**: Share your timer/stopwatch with anyone - they'll see the same time
- **📋 Copy Link**: One-click copy to clipboard functionality
- **⚡ Quick Presets**: Fast access to common time intervals (5, 15, 30 min, 1 hour)
- **📱 Responsive Design**: Works beautifully on desktop and mobile
- **🎨 Beautiful UI**: Smooth animations and gradient design

## 🚀 Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/umutcnkus/shareable-times.git
cd shareable-times
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

### Creating a Timer or Stopwatch

1. **Select your mode**: Choose between Timer or Stopwatch on the landing page
2. **Set the time**:
   - Click the rewind icon to show time inputs
   - Enter your desired time (days : hours : minutes : seconds)
   - Or use quick preset buttons (5 min, 15 min, 30 min, 1 hour)
3. **Start**: Click the play button to begin
4. **Share**: Click "Copy Link" to share your timer/stopwatch with others

### Sharing with Others

When you start a timer or stopwatch, the URL updates with a timestamp. Anyone who opens this URL will see the same timer/stopwatch synchronized to that start time.

**Example URLs:**
- Timer: `https://yoursite.com/shareable-times/timer/1234567890`
- Stopwatch: `https://yoursite.com/shareable-times/stopwatch/1234567890`

## 🛠️ Built With

- **React** - UI framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **React Timer Hook** - Timer/stopwatch functionality
- **Moment.js** - Date/time calculations
- **Boxicons** - Icon library

## 📦 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

**Note:** If using Node.js v17 or higher, you may need to use:
```bash
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

### `npm run deploy`
Deploys the app to GitHub Pages

## 🎨 Color Scheme

- Primary Orange: `#ff8906`
- Primary Pink: `#e53170`
- Background: Dark gradient
- Text: White with accent colors

## 📁 Project Structure

```
shareable-times/
├── public/              # Static files
├── src/
│   ├── components/
│   │   ├── selection/       # Landing page with mode selection
│   │   ├── stopwatch/       # Stopwatch display component
│   │   ├── timer/           # Timer display component
│   │   └── stopwatch-setter/ # Time input interface
│   ├── App.tsx          # Main app with routing
│   └── index.tsx        # React entry point
└── package.json
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔮 Future Features

- ⏰ Alarm functionality
- 🔊 Sound notifications when timer expires
- 🌙 Dark/Light mode toggle
- 📊 Time tracking history
- 🔄 Pause/Resume functionality
- 🎯 Pomodoro mode
- 🌍 Multi-timezone support
- 📱 Browser notifications

## 👨‍💻 Author

Created with ❤️ by [Umut Can Kus](https://github.com/umutcnkus)

## 🙏 Acknowledgments

- Icons by [Boxicons](https://boxicons.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Timer logic powered by [react-timer-hook](https://www.npmjs.com/package/react-timer-hook)
