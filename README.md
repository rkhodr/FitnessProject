# Spottr

A React-based web application for tracking fitness progress and getting AI-powered coaching advice from Coach Carl. The application features a chat interface with an AI coach and a comprehensive progress tracking system.

## Features

- **Coach Carl Chat**
  - Real-time conversation with GPT-4 powered AI coach
  - Personalized workout and nutrition advice
  - Form check guidance

- **Progress Tracking**
  - Visual charts for lift progress (Squat, Bench, Deadlift)
  - Weight and calorie tracking
  - Weekly progress summaries
  - Interactive data visualization

## Tech Stack

- Frontend:
  - React with TypeScript
  - Tailwind CSS for styling
  - Recharts for data visualization
  - React Router for navigation
  - HeadlessUI for components

- Backend:
  - Express.js
  - OpenAI API (GPT-4)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd spottr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the backend server:
   ```bash
   node server.cjs
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required for AI coach functionality)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details