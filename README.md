# Hospital Finance Intelligence Dashboard (HFID)

A modern, futuristic frontend-only React application for hospital financial management and analytics.

## Features

- 🎨 **Futuristic UI** - Glassmorphism design with neon glow effects
- 🌓 **Dark/Light Mode** - Full theme toggle with localStorage persistence
- 📊 **Interactive Charts** - Powered by Recharts with smooth animations
- ✨ **Smooth Animations** - Framer Motion for page transitions and interactions
- 📱 **Fully Responsive** - Works seamlessly on all device sizes
- 🎯 **Modular Architecture** - Clean, production-ready code structure

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Chart library
- **Framer Motion** - Animation library
- **React Router** - Client-side routing

## Project Structure

```
src/
  components/     # Reusable UI components
  pages/         # Page components
  data/          # Static JSON data files
  context/       # React context providers
  utils/         # Utility functions
  App.jsx        # Main app component with routing
  main.jsx       # Entry point
  index.css      # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Pages

1. **Landing** - Hero section with animated features
2. **Dashboard** - Overview with metrics and charts
3. **Departments** - Department-wise financial breakdown
4. **Treatment Costs** - Cost comparison and analysis
5. **Insurance & Claims** - Claims management and coverage estimator
6. **Reports** - Report cards and summaries
7. **Contact** - Contact form with validation

## Data Management

All data is stored in static JSON files in `/src/data`:
- `metrics.json` - Key financial metrics
- `departments.json` - Department data
- `costs.json` - Treatment costs
- `insurance.json` - Insurance claims and coverage
- `trends.json` - Historical trends and charts data

Hospital staff can update data by editing these JSON files directly.

## Theme System

The app includes a complete dark/light mode system:
- Theme preference is saved to localStorage
- Smooth transitions between themes
- Custom Tailwind dark mode classes
- Neon glow effects adapt to theme

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:
- Primary colors: `primary.*`
- Neon colors: `neon.*`

### Animations

Animation timings and effects can be adjusted in individual components using Framer Motion props.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

