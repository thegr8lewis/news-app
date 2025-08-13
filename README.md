# News App

A full-stack news application with Django REST API backend and React frontend, featuring multi-language support (English, Somali, Swahili) and responsive design.

## Features

- 📱 **Responsive Design**: Optimized for mobile, tablet, and desktop
- 🌍 **Multi-language Support**: English, Somali (so), and Swahili (sw)
- 📰 **Article Management**: Create, read, update, and delete articles
- 🏷️ **Categories**: Organize articles by categories
- 🎥 **Media Support**: Upload and display images and videos
- ⚡ **Real-time Translation**: Dynamic content translation
- 🎨 **Modern UI**: Clean, newspaper-style interface using Tailwind CSS
- 🔐 **Admin Panel**: Django admin interface for content management

## Tech Stack

### Backend
- **Framework**: Django 5.2.3
- **API**: Django REST Framework
- **Database**: PostgreSQL
- **Image Processing**: Pillow
- **CORS**: django-cors-headers

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios
- **UI Components**: Headless UI
- **Icons**: Heroicons

## Project Structure

```
news-app/
├── newsbackend/           # Django backend
│   ├── newsapi/          # Main API app
│   ├── newsbackend/      # Project settings
│   ├── manage.py
│   └── requirements.txt
├── newsfrontend/         # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd news-app
   ```

2. **Create and activate virtual environment**
   ```bash
   cd newsbackend
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your settings:
   ```env
   DJANGO_SECRET_KEY=your-secret-key-here
   DEBUG=True
   DATABASE_NAME=news_db
   DATABASE_USER=your_db_user
   DATABASE_PASSWORD=your_db_password
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   ```

5. **Set up database**
   ```bash
   # Create PostgreSQL database
   createdb news_db
   
   # Run migrations
   python manage.py makemigrations
   python manage.py migrate
   
   # Create superuser (optional)
   python manage.py createsuperuser
   ```

6. **Start backend server**
   ```bash
   python manage.py runserver
   ```
   Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../newsfrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_LIBRETRANSLATE_API_KEY=your-api-key-here
   ```

4. **Start frontend development server**
   ```bash
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

## API Endpoints

### Articles
- `GET /api/articles/` - List all articles
- `POST /api/articles/` - Create new article
- `GET /api/articles/{id}/` - Get specific article
- `PUT /api/articles/{id}/` - Update article
- `DELETE /api/articles/{id}/` - Delete article

### Categories
- `GET /api/categories/` - List all categories
- `POST /api/categories/` - Create new category

### Media Upload
- `POST /api/upload/` - Upload images/videos

## Language Support

The application supports three languages:

- **English (en)**: Default language
- **Somali (so)**: Full translation support
- **Swahili (sw)**: Full translation support

Articles can be created in any supported language, and the interface dynamically translates based on user selection.

## Mobile Responsiveness

The application is fully responsive with breakpoints:

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (xl)

Key mobile optimizations:
- Collapsible navigation
- Stacked layouts on small screens
- Touch-friendly interfaces
- Optimized image sizes

## Development

### Backend Development

```bash
cd newsbackend

# Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install new packages
pip install package-name
pip freeze > requirements.txt

# Database operations
python manage.py makemigrations
python manage.py migrate

# Run tests
python manage.py test

# Create admin user
python manage.py createsuperuser
```

### Frontend Development

```bash
cd newsfrontend

# Install new packages
npm install package-name

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Production Deployment

### Backend Deployment

1. Set `DEBUG=False` in production
2. Configure proper `ALLOWED_HOSTS`
3. Use production database settings
4. Set up static file serving
5. Configure CORS settings

### Frontend Deployment

1. Build the application: `npm run build`
2. Serve the `dist` folder with a web server
3. Configure API base URL for production

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests and ensure code quality
5. Commit your changes: `git commit -m "Add feature"`
6. Push to your fork: `git push origin feature-name`
7. Create a Pull Request

## Environment Variables

### Backend (.env)
```env
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_NAME=news_db
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_LIBRETRANSLATE_API_KEY=your-api-key-here
```

## Troubleshooting

### Common Issues

1. **Database connection errors**
   - Ensure PostgreSQL is running
   - Check database credentials in `.env`
   - Verify database exists

2. **CORS errors**
   - Check `CORS_ALLOWED_ORIGINS` in Django settings
   - Ensure frontend URL is included

3. **Static files not loading**
   - Run `python manage.py collectstatic`
   - Check `STATIC_URL` and `STATIC_ROOT` settings

4. **Translation not working**
   - Verify API key for translation service
   - Check network connectivity

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the development team.