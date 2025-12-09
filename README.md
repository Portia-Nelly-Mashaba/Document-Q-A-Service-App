# Document Q&A Application

A modern React TypeScript application for uploading documents and asking questions about them using real Google Generative AI. Built with React, TypeScript, Google Generative AI API integration, and a focus on user experience.

![Document Q&A Application](public/images/image.png)

## 🚀 Features

### Core Functionality
- ✅ **Document Upload** - Drag-and-drop file upload with progress tracking
- ✅ **Document Library** - View all uploaded documents with metadata (name, size, upload date)
- ✅ **Question & Answer** - Ask questions and receive answers from **Google Generative AI (Gemini)**
- ✅ **Q&A History** - View all previous questions and answers with metadata
- ✅ **Search** - Debounced search across Q&A history
- ✅ **Export** - Export Q&A history as JSON
- ✅ **AI Metadata** - Track response source (AI/Mock), response time, and model info

### Technical Features
- ✅ **Google AI Integration** - Real Generative AI responses using Google's Gemini API
- ✅ **Smart Fallback** - Automatically falls back to mock data if API is unavailable
- ✅ **Response Metadata** - Tracks source (AI/Mock), response time, and model information
- ✅ **API Testing Tools** - Debug Panel component for testing API connectivity
- ✅ **TypeScript** - Full type safety throughout the application
- ✅ **Custom Hooks** - Reusable hooks for documents, Q&A, and localStorage
- ✅ **Error Boundaries** - Graceful error handling with user-friendly messages
- ✅ **Local Storage** - Persistent data storage for documents and Q&A
- ✅ **Form Validation** - Real-time validation with visual feedback
- ✅ **Loading States** - Skeleton loaders for better UX
- ✅ **File Validation** - Type and size validation for uploads
- ✅ **Dark/Light Mode** - Theme toggle with persistent preference

### UI/UX Features
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Toast Notifications** - Success, error, and info messages
- ✅ **Keyboard Shortcuts** - Ctrl+Enter (or ⌘+Enter) to submit questions
- ✅ **Progress Indicators** - Upload progress bars
- ✅ **Accessibility** - Proper ARIA labels and keyboard navigation

![Application Features](public/images/image1.png)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Generative AI API Key (optional - app works with mock data as fallback)

## 🤖 Google AI Integration

This app uses **Google Generative AI (Gemini)** to generate intelligent answers to questions:

### Setup
1. Get a free API key from [Google AI Studio](https://aistudio.google.com)
2. Add to `.env` file:
```bash
REACT_APP_GOOGLE_API_KEY=your_api_key_here
```

### How It Works
- **With API Key**: Sends questions to Google Generative AI for real AI responses
- **Without API Key**: Automatically uses mock data (app still works!)
- **API Failures**: Gracefully falls back to mock data with error indicators

### Testing the API
1. Start the app: `npm start`
2. Add `<DebugPanel />` to your App component (optional)
3. Click "Run Test" in the Debug Panel to verify API connectivity
4. Check browser console (F12) for detailed logs

### Response Indicators
- 🤖 **Green Badge**: AI-generated response from Google
- 🎭 **Orange Badge**: Mock/simulated response (fallback)
- ⚡ **Speed Badge**: Response time in milliseconds
- ⚠️ **Error Badge**: API encountered an issue

### API Details
- **Endpoint**: Google Generative AI (Gemini)
- **Model**: `gemini-pro`
- **Authentication**: API key via environment variable
- **Typical Response Time**: 500-3000ms

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd document_qa_app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
document_qa_app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── DebugPanel.tsx         # 🆕 Google AI testing interface
│   │   ├── QAResponseCard.tsx      # 🆕 Enhanced response display with metadata
│   │   ├── DocumentList.tsx        # Document list with icons
│   │   ├── DocumentUpload.tsx      # Upload component (legacy)
│   │   ├── ErrorBoundary.tsx       # Error boundary component
│   │   ├── QAHistory.tsx           # Q&A history with search
│   │   ├── QASection.tsx           # Question input with validation
│   │   ├── Sidebar.tsx             # Main sidebar navigation
│   │   ├── ThemeToggle.tsx         # Theme switcher
│   │   ├── Toast.tsx               # Toast notifications
│   │   └── UploadModal.tsx         # Upload modal with validation
│   ├── hooks/
│   │   ├── useDebounce.ts          # Debounce hook for search
│   │   ├── useDocuments.ts         # Document management hook
│   │   ├── useLocalStorage.ts      # LocalStorage hook
│   │   └── useQA.ts                # Q&A management hook with Google AI
│   ├── styles/
│   │   ├── DebugPanel.css          # 🆕 Debug panel styling
│   │   └── QAResponseCard.css      # 🆕 Response card styling
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── utils/
│   │   ├── testGoogleAI.ts         # 🆕 Google AI testing utility
│   │   └── mockData.ts             # Mock data for fallback
│   ├── App.tsx                     # Main app component
│   ├── App.css                     # Main stylesheet
│   └── index.tsx                   # Entry point
├── .env                            # Environment variables (API key)
├── package.json
└── README.md
```

## 🎯 Usage

### Uploading Documents
1. Click the "Upload Document" button in the sidebar
2. Drag and drop a file or click to browse
3. Supported formats: PDF, DOCX, DOC, MD, TXT, JSON
4. Maximum file size: 10MB
5. Watch the upload progress indicator

### Asking Questions
1. Select a document from the sidebar
2. Type your question in the input field (max 500 characters)
3. Press Ctrl+Enter (or ⌘+Enter on Mac) or click "Ask"
4. **Real AI Response**: If API key is configured, you'll get an AI response from Google Generative AI
5. **Fallback Response**: If API is unavailable, the app uses mock data automatically
6. Check the response metadata:
   - 🤖 Badge = AI response (Google Gemini)
   - 🎭 Badge = Mock response (fallback)
   - ⚡ = Response time in milliseconds

### Testing Google AI Integration
1. Import and add DebugPanel to your App component:
```typescript
import DebugPanel from './components/DebugPanel';

function App() {
  return (
    <div>
      <DebugPanel /> {/* Add this for testing */}
      {/* Rest of your app */}
    </div>
  );
}
```

2. Click "Run Test" button in the Debug Panel
3. View results:
   - ✅ Success = API is working correctly
   - ❌ Error = API issue detected (see error details)
4. Response time and diagnostics are shown in real-time

### Searching Q&A History
1. Use the search bar above the Q&A history
2. Search is debounced (400ms delay) for performance
3. Searches both questions and answers

### Exporting Q&A History
1. Click "Export Q&A History" in the sidebar footer
2. A JSON file will be downloaded with all Q&A data

### Keyboard Shortcuts
- **Ctrl+Enter** (Windows/Linux) or **⌘+Enter** (Mac): Submit question

## 🔧 Technical Details

### Google AI Integration
- **API**: Google Generative AI (Gemini)
- **Model**: `gemini-pro`
- **Endpoint**: `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent`
- **Authentication**: API key via environment variable (`REACT_APP_GOOGLE_API_KEY`)
- **Fallback**: Mock data when API is unavailable
- **Response Metadata**: Tracks source, response time, model, and error status

### State Management
- Custom hooks for data management
- LocalStorage for persistence
- React Context not used (simple state management as per requirements)

### Error Handling
- Error Boundary component catches React errors
- Try-catch blocks for async operations
- User-friendly error messages via Toast notifications

### Performance Optimizations
- Debounced search (400ms delay)
- Memoized callbacks with useCallback
- Efficient re-renders with proper dependency arrays

### Type Safety
- Full TypeScript implementation
- Proper interfaces for all data structures
- Type-safe props and state

## 🎨 Styling

- Custom CSS with CSS variables
- Black and white color scheme
- Dark/Light mode support
- Responsive design
- Smooth transitions and animations

## 📦 Dependencies

### Production
- `react` - UI library
- `react-dom` - React DOM bindings
- `typescript` - Type safety

### Development
- `react-scripts` - Build tooling
- `@types/*` - TypeScript type definitions
- `@testing-library/*` - Testing utilities

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📦 Building for Production

Build the production bundle:
```bash
npm run build
```

The build folder will contain the optimized production build.

## 🚀 Deployment

The app can be deployed to:
- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag and drop the build folder
- **GitHub Pages**: Use gh-pages package

### Environment Variables
```bash
# Optional - for Google AI integration
REACT_APP_GOOGLE_API_KEY=your_google_api_key
```

**Note**: The app works without the API key - it will automatically use mock data as fallback.

## 🔮 Future Enhancements

Potential improvements:
- **Document Analysis**: Pass document content to AI for context-aware answers
- **Multiple AI Models**: Support for GPT-4, Claude, and other models
- **Markdown Rendering**: Rich formatting for AI responses
- **Unit Tests**: Jest/React Testing Library coverage
- **Advanced Animations**: Framer Motion integration
- **Document Preview**: PDF and file preview functionality
- **Q&A Editing**: Edit and regenerate answers
- **Performance Monitoring**: Track API usage and costs
- **User Authentication**: Multi-user support with login

## 📝 License

This project is created for evaluation purposes.

## 👨‍💻 Author

Built as part of a technical assessment demonstrating React and TypeScript skills.

---

## 📖 Documentation

For detailed information about Google AI integration, see:
- **[00_READ_ME_FIRST.md](./00_READ_ME_FIRST.md)** - Quick start guide
- **[QUICK_START.md](./QUICK_START.md)** - Feature overview
- **[GOOGLE_AI_TESTING.md](./GOOGLE_AI_TESTING.md)** - Comprehensive testing guide
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Code examples
- **[ERROR_404_FIXED.md](./ERROR_404_FIXED.md)** - API troubleshooting

## ✨ Recent Updates

**v1.1.0 - Google AI Integration**
- ✨ Added real Google Generative AI (Gemini) integration
- ✨ Added Debug Panel component for API testing
- ✨ Added response metadata tracking (source, time, model)
- ✨ Added enhanced QAResponseCard with visual indicators
- ✨ Added intelligent fallback system
- ✨ Added comprehensive logging for debugging
- ✨ Updated documentation with 9 new guides

---

**Note**: This application now integrates with Google Generative AI for intelligent Q&A. If an API key is not configured, the app automatically falls back to mock data, ensuring the application always works.
