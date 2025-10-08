# Pterodactyl Advanced Panel Themes

A collection of modern, advanced themes for Pterodactyl Panel with enhanced UI components, smooth animations, and beautiful designs.

## 🎨 Available Themes

### Advanced Dark Theme
A sleek dark theme with modern gradients, glass morphism effects, and smooth animations.

### Advanced Light Theme
A clean light theme with professional styling and enhanced visual hierarchy.

## ✨ Features

- **Modern Design**: Clean, contemporary interface with beautiful gradients
- **Smooth Animations**: Fluid transitions and hover effects throughout
- **Enhanced Components**: Custom styled buttons, cards, forms, and tables
- **Status Indicators**: Beautiful server status badges and progress bars
- **Responsive Design**: Optimized for all screen sizes
- **Glass Morphism**: Modern glass effects and backdrop filters
- **Custom Scrollbars**: Styled scrollbars that match the theme
- **Loading Animations**: Elegant loading states and spinners
- **Notification System**: Toast notifications with smooth animations

## 🚀 Installation

### Method 1: Manual Installation

1. **Download the themes** to your Pterodactyl Panel directory:
   ```bash
   # Navigate to your Pterodactyl Panel directory
   cd /var/www/pterodactyl
   
   # Create themes directory
   mkdir -p public/themes
   
   # Copy theme files
   cp -r themes/advanced-dark public/themes/
   cp -r themes/advanced-light public/themes/
   ```

2. **Update your panel configuration** to use the theme:
   ```php
   // In config/app.php, add or modify:
   'theme' => 'advanced-dark', // or 'advanced-light'
   ```

3. **Clear cache** and restart your web server:
   ```bash
   php artisan cache:clear
   php artisan view:clear
   systemctl restart nginx  # or apache2
   ```

### Method 2: Using Git (Recommended)

1. **Clone the repository** into your Pterodactyl directory:
   ```bash
   cd /var/www/pterodactyl
   git clone https://github.com/your-repo/pterodactyl-advanced-themes.git temp-themes
   
   # Copy themes to public directory
   cp -r temp-themes/themes/* public/themes/
   
   # Clean up
   rm -rf temp-themes
   ```

2. **Configure the theme** in your panel settings.

## 🎛️ Configuration

### Theme Selection

You can switch between themes by modifying your panel configuration:

```php
// For Dark Theme
'theme' => 'advanced-dark',

// For Light Theme  
'theme' => 'advanced-light',
```

### Custom Color Schemes

Both themes support custom color schemes. You can modify the CSS variables in the theme files:

```css
:root {
  --primary-color: #6366f1;    /* Your primary color */
  --secondary-color: #8b5cf6;  /* Your secondary color */
  --success: #10b981;          /* Success color */
  --warning: #f59e0b;          /* Warning color */
  --error: #ef4444;            /* Error color */
}
```

## 🎨 Customization

### Color Customization

Edit the CSS variables in your chosen theme file:

```css
/* themes/advanced-dark/theme.css */
:root {
  --primary-color: #your-color;
  --bg-primary: #your-background;
  --text-primary: #your-text-color;
}
```

### Component Styling

Each theme includes comprehensive styling for:
- Navigation bars
- Cards and containers
- Buttons and forms
- Tables and data displays
- Server status indicators
- File manager interface
- Database management
- User management
- Activity logs
- Settings panels

### Animation Customization

Modify animation durations and effects:

```css
/* Faster animations */
* {
  transition: all 0.2s ease;
}

/* Disable animations */
* {
  transition: none !important;
  animation: none !important;
}
```

## 📱 Responsive Design

The themes are fully responsive and optimized for:
- Desktop computers (1920px+)
- Laptops (1366px - 1920px)
- Tablets (768px - 1366px)
- Mobile devices (320px - 768px)

## 🔧 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🐛 Troubleshooting

### Theme Not Loading

1. **Check file permissions**:
   ```bash
   chmod -R 755 public/themes/
   chown -R www-data:www-data public/themes/
   ```

2. **Clear all caches**:
   ```bash
   php artisan cache:clear
   php artisan view:clear
   php artisan config:clear
   ```

3. **Check web server configuration** for static file serving.

### Styling Issues

1. **Clear browser cache** and hard refresh (Ctrl+F5)
2. **Check for CSS conflicts** with other custom styles
3. **Verify theme files** are in the correct directory

### Performance Issues

1. **Enable gzip compression** in your web server
2. **Use a CDN** for static assets
3. **Minify CSS files** for production

## 🤝 Contributing

We welcome contributions! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/pterodactyl-advanced-themes.git
   cd pterodactyl-advanced-themes
   ```

2. **Make your changes** to the theme files
3. **Test thoroughly** on different browsers and devices
4. **Submit a pull request** with a clear description

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Pterodactyl Panel team for the amazing platform
- Contributors and community feedback
- Modern CSS techniques and best practices

## 📞 Support

If you encounter any issues or have questions:

1. **Check the documentation** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join our community** discussions

---

**Made with ❤️ for the Pterodactyl community**
