# Horizon - AI-Powered Travel Planner 🌟

An end-to-end intelligent travel planning platform that transforms your travel dreams into perfectly crafted itineraries using advanced AI technology.

## ✨ Features

- **AI-Powered Planning**: Leverage Gemini 2.5 Pro for intelligent travel recommendations
- **Smart Route Optimization**: Automatically optimize travel routes for maximum efficiency
- **Interactive Maps**: Real-time map integration with Leaflet for visual planning
- **Chat Interface**: Natural language conversation with AI travel assistant
- **Personalized Recommendations**: Tailored suggestions based on preferences and budget
- **Booking Integration**: Seamless hotel and transportation booking capabilities

## 🏗️ Architecture

**Frontend (React + Vite)**
- Modern React application with responsive design
- Tailwind CSS for styling with Framer Motion animations
- Interactive maps using Leaflet and React-Leaflet
- Real-time chat interface with AI assistant

**Backend (Microservices)**
- **API Gateway**: Central routing and request management
- **Trip Planner**: Core AI planning logic with Gemini integration
- **Router**: Route optimization and travel calculations  
- **Booking Service**: Hotel and transportation booking
- **Recommendation Engine**: Personalized suggestions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.8+
- Google API Key (for Gemini AI)

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend-foursquare

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend-foursquare

# Install dependencies for each service
pip install flask flask-cors python-dotenv google-generativeai geopy requests

# Set up environment variables
cp .env.example .env
# Add your GOOGLE_API_KEY to .env file

# Start API Gateway
cd api_gateway
python app.py

# Start Trip Planner Service (new terminal)
cd trip_planner
python app.py

# Start Router Service (new terminal)
cd router
python app.py

# Start other services as needed
```

## 📝 Environment Variables

Create `.env` files in each backend service directory:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
TRIP_PLANNER_URL=http://localhost:5001
ROUTER_URL=http://localhost:5002
RECOMMENDATION_URL=http://localhost:5003
BOOKING_URL=http://localhost:5004
```

## 🛠️ Development Scripts

**Frontend Commands**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Backend Commands**
```bash
python app.py        # Start individual service
flask run            # Alternative Flask startup
```

## 📁 Project Structure

```
horizon/
├── frontend-foursquare/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── main-page/         # Main chat/map page
│   │   ├── utils/             # Utility functions
│   │   └── App.jsx            # Main app component
│   ├── package.json
│   └── vite.config.js
├── backend-foursquare/
│   ├── api_gateway/           # API Gateway service
│   ├── trip_planner/          # AI planning service
│   ├── router/                # Route optimization
│   ├── booking/               # Booking management
│   └── recommendation/        # Recommendation engine
└── README.md
```

## 🔧 Key Dependencies

**Frontend**
- React 19.1.1 - UI framework
- Vite 6.3.5 - Build tool
- Tailwind CSS 4.1.12 - Styling
- Framer Motion 12.23.12 - Animations
- Leaflet 1.9.4 - Maps
- Lucide React 0.523.0 - Icons

**Backend**
- Flask - Web framework
- Google Generative AI - Gemini integration
- GeoPy - Geographic calculations
- Flask-CORS - Cross-origin support

## 🌐 API Endpoints

**Trip Planning**
- `POST /api/trip/plan` - Create new trip plan
- `POST /api/trip/chat` - Chat with AI assistant
- `POST /api/trip/optimize` - Optimize route

**Recommendations**
- `POST /api/recommendations` - Get personalized suggestions

**Booking**
- `POST /api/booking/accommodation` - Book hotels
- `POST /api/booking/transportation` - Book transport

## 🚦 Usage

1. **Start the Application**: Run both frontend and backend services
2. **Open Browser**: Navigate to `http://localhost:5173`
3. **Plan Your Trip**: Use the chat interface to describe your travel preferences
4. **View Results**: Explore AI-generated itineraries on the interactive map
5. **Optimize & Book**: Fine-tune routes and make bookings directly

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in `/docs`
- Review the API documentation

---

**Built with ❤️ using React, Flask, and Google AI**
