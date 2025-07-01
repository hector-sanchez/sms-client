# SMS Client

A modern, responsive SMS messaging application built with Angular 20. This application provides a clean interface for sending and managing SMS messages with JWT-based authentication.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Send Messages**: Send SMS messages to any phone number
- **Message History**: View all sent messages with timestamps and status
- **Real-time Updates**: Automatic refresh of message list after sending
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, accessible black-and-white interface
- **Form Validation**: Comprehensive client-side validation
- **Error Handling**: User-friendly error messages and loading states

## 🏗️ Architecture

### Component Structure
```
src/app/components/
├── shared/                     # Reusable components
│   ├── app-header/            # Navigation header
│   └── auth-form/             # Authentication form
└── pages/                     # Page-level components
    ├── signin/                # Sign-in page
    ├── register/              # Registration page
    └── messages/              # Messages page (main app)
        ├── messages.ts        # Container component
        └── components/
            ├── new-message/   # Message composition form
            ├── messages-list/ # Message list container
            └── message/       # Individual message display
```

### Key Architectural Decisions

- **Standalone Components**: Uses Angular's modern standalone component architecture
- **Modular Design**: Each feature is encapsulated in its own component
- **Centralized Constants**: All configuration in `app-constants.ts`
- **Modern Control Flow**: Uses Angular's new `@if` and `@for` syntax
- **Reactive Forms**: Form validation with Angular's reactive forms
- **Event-Driven Communication**: Parent-child communication via events

## 🛠️ Technology Stack

- **Framework**: Angular 20
- **Language**: TypeScript 5.8
- **Styling**: Pure CSS with responsive design
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router
- **Forms**: Angular Reactive Forms
- **Build Tool**: Angular CLI

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Backend SMS API server running on `http://localhost:3000`

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sms-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Backend Requirements

The application expects a backend API running on `http://localhost:3000` with the following endpoints:

#### Authentication Endpoints
- `POST /users` - User registration
- `POST /auths` - User login

#### Message Endpoints
- `GET /users/{userId}/messages` - Get user messages
- `POST /messages` - Send new message

#### Expected API Response Formats

**Login Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

**Messages Response:**
```json
[
  {
    "id": 1,
    "body": "Hello world!",
    "phone_number": "+1234567890",
    "status": "sent",
    "created_at": "2025-01-01T12:00:00Z",
    "updated_at": "2025-01-01T12:00:00Z",
    "user_id": 1
  }
]
```

**Send Message Request:**
```json
{
  "to": "+1234567890",
  "body": "Hello from SMS API!"
}
```

## 🔧 Configuration

### Environment Configuration

Update `src/app/constants/app-constants.ts` to configure:

- **API Base URL**: Change `API_BASE_URL` for different environments
- **Message Limits**: Adjust `MAX_MESSAGE_LENGTH`
- **Token Settings**: Modify `TOKEN_STORAGE_KEY` and `SESSION_TIMEOUT`

### Build Configuration

- **Development**: `npm start` - Runs with hot reload
- **Production**: `npm run build` - Optimized production build
- **Watch Mode**: `npm run watch` - Build with file watching

## 🎨 UI/UX Features

### Design Principles
- **Accessibility First**: WCAG compliant design
- **Mobile Responsive**: Works seamlessly on all screen sizes
- **Clean Interface**: Minimalist black-and-white design
- **Intuitive Navigation**: Clear user flow and navigation

### Key UI Components
- **Two-Column Layout**: Form on left, messages on right
- **Real-time Character Counter**: Live feedback on message length
- **Loading States**: Spinners and loading indicators
- **Error Handling**: Clear error messages and retry options
- **Success Feedback**: Confirmation messages for actions

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Form Validation**: Client-side input validation
- **Phone Number Validation**: International phone number format validation
- **XSS Protection**: Angular's built-in sanitization
- **CSRF Protection**: Stateless JWT design

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px+ (Two-column layout)
- **Tablet**: 768px-1023px (Stacked layout)
- **Mobile**: <768px (Optimized for touch)

### Mobile Optimizations
- Touch-friendly button sizes
- Optimized form layouts
- Condensed message display
- Swipe-friendly interactions

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test -- --code-coverage

# Run tests in watch mode
npm run test -- --watch
```

## 📦 Building for Production

```bash
# Build for production
npm run build

# The build artifacts will be stored in the `dist/` directory
```

### Production Optimizations
- Tree shaking for smaller bundles
- Code splitting for lazy loading
- Minification and compression
- Angular's Ahead-of-Time (AOT) compilation

## 🔄 Development Workflow

### Component Development
1. Create component in appropriate directory
2. Implement TypeScript logic
3. Create HTML template using modern control flow (`@if`, `@for`)
4. Style with CSS following existing patterns
5. Add to parent component imports

### Best Practices
- Use standalone components
- Implement proper TypeScript types
- Follow Angular style guide
- Use centralized constants
- Implement proper error handling

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
- Ensure all imports are correctly typed
- Check that all components are properly imported
- Verify template syntax uses modern control flow

**API Connection Issues:**
- Verify backend server is running on `http://localhost:3000`
- Check CORS configuration on backend
- Verify API endpoints match expected format

**Authentication Issues:**
- Check JWT token format and expiration
- Verify token storage and retrieval
- Ensure proper Authorization headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

### Code Standards
- Follow Angular style guide
- Use TypeScript strict mode
- Maintain test coverage
- Follow existing architectural patterns

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- **Message Threading**: Group messages by conversation
- **Message Status**: Real-time delivery status updates
- **Attachments**: Support for images and files
- **Dark Mode**: Theme switching capability
- **Notifications**: Push notifications for new messages
- **Search**: Message search and filtering
- **Export**: Export message history

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

Built with ❤️ using Angular 20
