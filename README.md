# Document Q&A Application

A modern React TypeScript application for uploading documents and asking questions about them. Built with React, TypeScript, and a focus on user experience.

## 🚀 Features

### Core Functionality
- ✅ **Document Upload** - Drag-and-drop file upload with progress tracking
- ✅ **Document Library** - View all uploaded documents with metadata (name, size, upload date)
- ✅ **Question & Answer** - Ask questions about documents and receive mock AI responses
- ✅ **Q&A History** - View all previous questions and answers
- ✅ **Search** - Debounced search across Q&A history
- ✅ **Export** - Export Q&A history as JSON

### Technical Features
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

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

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
│   │   ├── DocumentList.tsx      # Document list with icons
│   │   ├── DocumentUpload.tsx     # Upload component (legacy)
│   │   ├── ErrorBoundary.tsx      # Error boundary component
│   │   ├── QAHistory.tsx          # Q&A history with search
│   │   ├── QASection.tsx          # Question input with validation
│   │   ├── Sidebar.tsx            # Main sidebar navigation
│   │   ├── ThemeToggle.tsx        # Theme switcher
│   │   ├── Toast.tsx               # Toast notifications
│   │   └── UploadModal.tsx        # Upload modal with validation
│   ├── hooks/
│   │   ├── useDebounce.ts         # Debounce hook for search
│   │   ├── useDocuments.ts       # Document management hook
│   │   ├── useLocalStorage.ts     # LocalStorage hook
│   │   └── useQA.ts               # Q&A management hook
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── utils/
│   │   └── mockData.ts            # Mock data for development
│   ├── App.tsx                     # Main app component
│   ├── App.css                     # Main stylesheet
│   └── index.tsx                   # Entry point
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
4. Wait for the mock response (simulated 1.5s delay)

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
No environment variables required for basic functionality.

## 🔮 Future Enhancements

Potential improvements:
- Real API integration (OpenAI, etc.)
- Markdown rendering for answers
- Unit tests with Jest
- More animations
- File preview functionality
- Document deletion
- Q&A editing

## 📝 License

This project is created for evaluation purposes.

## 👨‍💻 Author

Built as part of a technical assessment demonstrating React and TypeScript skills.

---

**Note**: This application uses mock data and simulated API responses. In a production environment, you would integrate with a real backend API.
