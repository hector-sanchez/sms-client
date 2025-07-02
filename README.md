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

## ⚡ Quick Deploy (2 Minutes)

**Want to deploy right now?** Here's the fastest way:

1. **Push your code to GitHub** (if not already done)
2. **Go to [vercel.com](https://vercel.com)** and sign up with GitHub
3. **Click "New Project"** and import your repository
4. **Click "Deploy"** (no configuration needed!)
5. **🎉 Your app is live!** You'll get a URL like `https://sms-client-yourname.vercel.app`

> **Note**: Update the API URL in `src/app/constants/app-constants.ts` before deploying to connect to your production backend.

[📖 See detailed deployment instructions below](#-deployment)

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

## 🚀 Deployment

### Pre-Deployment Checklist ✅

Before deploying, make sure you have:

1. **✅ Code in a Git repository** (GitHub, GitLab, etc.)
2. **✅ Updated API URL** in `src/app/constants/app-constants.ts`:
   ```typescript
   static readonly API_BASE_URL = 'https://your-production-api.com';
   ```
3. **✅ Tested the build** locally:
   ```bash
   npm run build:prod
   ```
4. **✅ Backend API deployed** and accessible from your domain

### Deployment Options

This application can be easily deployed to several beginner-friendly hosting platforms. Here are step-by-step instructions for the most popular options:

### Option 1: Vercel (Recommended)

[Vercel](https://vercel.com) is perfect for Angular applications and offers excellent performance with global CDN.

#### Prerequisites
- GitHub account
- Code pushed to a GitHub repository

#### Steps:

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up using your GitHub account

2. **Import your project**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's an Angular app

3. **Configure deployment**
   - Framework Preset: Angular
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist/sms-client` (auto-detected)
   - Install Command: `npm install` (auto-detected)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-app-name.vercel.app`

5. **Environment Variables (if needed)**
   - Go to your project dashboard
   - Navigate to Settings → Environment Variables
   - Add any production environment variables

#### Automatic Deployments
- Every push to your main branch will automatically trigger a new deployment
- Pull requests get preview deployments

### Option 2: Netlify

[Netlify](https://netlify.com) is another excellent choice with drag-and-drop deployment options.

#### Method A: Git-based Deployment (Recommended)

1. **Sign up for Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up using your GitHub account

2. **New site from Git**
   - Click "New site from Git"
   - Choose GitHub and authorize Netlify
   - Select your repository

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist/sms-client`
   - Click "Deploy site"

4. **Custom domain (optional)**
   - Go to Site settings → Domain management
   - Change site name or add custom domain

#### Method B: Manual Deployment

1. **Build your app locally**
   ```bash
   npm run build:prod
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist/sms-client` folder to the deploy area
   - Your site will be live immediately

### Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

1. **Build for GitHub Pages**
   ```bash
   npm install -g angular-cli-ghpages
   npm run build:prod
   npx angular-cli-ghpages --dir=dist/sms-client
   ```

2. **Enable GitHub Pages**
   - Go to your repository → Settings → Pages
   - Select source: Deploy from a branch
   - Branch: `gh-pages`
   - Your app will be available at `https://yourusername.github.io/sms-client`

### Option 4: Firebase Hosting

Google's hosting platform with excellent performance.

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and initialize**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure Firebase**
   - Select "Use an existing project" or create new
   - Public directory: `dist/sms-client`
   - Single-page app: Yes
   - Overwrite index.html: No

4. **Build and deploy**
   ```bash
   npm run build:prod
   firebase deploy
   ```

### Important Notes for Production

#### API Configuration
Before deploying, you may need to update the API endpoints in `src/app/constants/app-constants.ts`:

```typescript
// For production, update the API_BASE_URL
static readonly API_BASE_URL = 'https://your-production-api.com';
```

#### Environment-specific Builds
Create different configurations for different environments by updating `angular.json`:

```json
"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ]
  }
}
```

#### Performance Optimizations
The production build automatically includes:
- ✅ Minification and compression
- ✅ Tree shaking (removing unused code)
- ✅ Ahead-of-Time (AOT) compilation
- ✅ Bundle optimization

#### SSL/HTTPS
All recommended platforms provide free SSL certificates automatically.

### Troubleshooting Deployment

**Build Fails:**
- Check that all dependencies are in `package.json`
- Verify Angular version compatibility
- Check for TypeScript errors locally

**404 Errors on Refresh:**
- Ensure routing configuration is correct (already configured in `vercel.json` and `netlify.toml`)
- For other platforms, configure server to redirect all routes to `index.html`

**API Connection Issues:**
- Update API endpoints for production
- Check CORS settings on your backend
- Verify environment variables are set correctly

### Quick Start (Vercel - Easiest)

If you want to deploy right now:

1. Push your code to GitHub (if not already done)
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click "New Project" and import your repository
4. Click "Deploy"
5. Your app will be live in under 2 minutes! 🎉

Your live URL will be something like: `https://sms-client-username.vercel.app`
