#!/bin/bash

# Pterodactyl Advanced Themes Installation Script
# This script automates the installation of the advanced themes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_warning "This script should not be run as root for security reasons."
   read -p "Do you want to continue? (y/N): " -n 1 -r
   echo
   if [[ ! $REPLY =~ ^[Yy]$ ]]; then
       exit 1
   fi
fi

# Get Pterodactyl Panel directory
print_status "Detecting Pterodactyl Panel installation..."

# Common Pterodactyl Panel locations
PANEL_DIRS=(
    "/var/www/pterodactyl"
    "/var/www/html/pterodactyl"
    "/home/pterodactyl/panel"
    "/opt/pterodactyl"
    "/srv/pterodactyl"
)

PANEL_DIR=""
for dir in "${PANEL_DIRS[@]}"; do
    if [[ -d "$dir" && -f "$dir/artisan" ]]; then
        PANEL_DIR="$dir"
        break
    fi
done

# If not found, ask user
if [[ -z "$PANEL_DIR" ]]; then
    print_warning "Could not automatically detect Pterodactyl Panel directory."
    read -p "Please enter the full path to your Pterodactyl Panel directory: " PANEL_DIR
    
    if [[ ! -d "$PANEL_DIR" ]]; then
        print_error "Directory does not exist: $PANEL_DIR"
        exit 1
    fi
    
    if [[ ! -f "$PANEL_DIR/artisan" ]]; then
        print_error "This doesn't appear to be a Pterodactyl Panel directory (artisan file not found)"
        exit 1
    fi
fi

print_success "Found Pterodactyl Panel at: $PANEL_DIR"

# Check if themes directory exists
THEMES_DIR="$PANEL_DIR/public/themes"
if [[ ! -d "$THEMES_DIR" ]]; then
    print_status "Creating themes directory..."
    mkdir -p "$THEMES_DIR"
fi

# Copy theme files
print_status "Installing Advanced Dark Theme..."
if [[ -d "themes/advanced-dark" ]]; then
    cp -r themes/advanced-dark "$THEMES_DIR/"
    print_success "Advanced Dark Theme installed successfully"
else
    print_error "Advanced Dark Theme directory not found"
    exit 1
fi

print_status "Installing Advanced Light Theme..."
if [[ -d "themes/advanced-light" ]]; then
    cp -r themes/advanced-light "$THEMES_DIR/"
    print_success "Advanced Light Theme installed successfully"
else
    print_error "Advanced Light Theme directory not found"
    exit 1
fi

# Set proper permissions
print_status "Setting file permissions..."
chmod -R 755 "$THEMES_DIR"
if command -v chown >/dev/null 2>&1; then
    # Try to detect web server user
    WEB_USER=""
    if id "www-data" >/dev/null 2>&1; then
        WEB_USER="www-data"
    elif id "nginx" >/dev/null 2>&1; then
        WEB_USER="nginx"
    elif id "apache" >/dev/null 2>&1; then
        WEB_USER="apache"
    fi
    
    if [[ -n "$WEB_USER" ]]; then
        chown -R "$WEB_USER:$WEB_USER" "$THEMES_DIR"
        print_success "Set ownership to $WEB_USER"
    else
        print_warning "Could not detect web server user, you may need to set ownership manually"
    fi
fi

# Clear Laravel caches
print_status "Clearing Laravel caches..."
cd "$PANEL_DIR"

if command -v php >/dev/null 2>&1; then
    php artisan cache:clear 2>/dev/null || print_warning "Could not clear application cache"
    php artisan view:clear 2>/dev/null || print_warning "Could not clear view cache"
    php artisan config:clear 2>/dev/null || print_warning "Could not clear config cache"
    print_success "Laravel caches cleared"
else
    print_warning "PHP not found, please clear caches manually: php artisan cache:clear"
fi

# Theme selection
echo
print_status "Theme installation completed!"
echo
echo "Available themes:"
echo "1. Advanced Dark Theme"
echo "2. Advanced Light Theme"
echo
read -p "Which theme would you like to activate? (1/2): " -n 1 -r
echo

case $REPLY in
    1)
        print_status "To activate the Advanced Dark Theme, add this to your .env file:"
        echo "THEME=advanced-dark"
        ;;
    2)
        print_status "To activate the Advanced Light Theme, add this to your .env file:"
        echo "THEME=advanced-light"
        ;;
    *)
        print_warning "No theme selected. You can configure it later."
        ;;
esac

echo
print_success "Installation completed successfully!"
echo
print_status "Next steps:"
echo "1. Add THEME=advanced-dark or THEME=advanced-light to your .env file"
echo "2. Restart your web server (nginx/apache)"
echo "3. Clear your browser cache and refresh the panel"
echo
print_status "For more information, see the README.md file"
echo
print_success "Enjoy your new advanced Pterodactyl Panel theme! 🎨"
