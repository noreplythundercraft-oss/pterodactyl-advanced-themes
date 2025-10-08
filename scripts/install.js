#!/usr/bin/env node

/**
 * Pterodactyl Advanced Themes Installation Script
 * Node.js version for cross-platform compatibility
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logError(message) {
  log(`✗ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ ${message}`, 'blue');
}

// Check if running on Windows
const isWindows = process.platform === 'win32';

// Common Pterodactyl Panel locations
const panelDirs = [
  '/var/www/pterodactyl',
  '/var/www/html/pterodactyl',
  '/home/pterodactyl/panel',
  '/opt/pterodactyl',
  '/srv/pterodactyl',
  'C:\\xampp\\htdocs\\pterodactyl',
  'C:\\wamp64\\www\\pterodactyl',
  'C:\\laragon\\www\\pterodactyl'
];

function findPterodactylDirectory() {
  logInfo('Searching for Pterodactyl Panel installation...');
  
  for (const dir of panelDirs) {
    if (fs.existsSync(dir) && fs.existsSync(path.join(dir, 'artisan'))) {
      return dir;
    }
  }
  
  return null;
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source directory does not exist: ${src}`);
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function setPermissions(filePath) {
  try {
    if (!isWindows) {
      execSync(`chmod -R 755 "${filePath}"`, { stdio: 'pipe' });
    }
  } catch (error) {
    logWarning(`Could not set permissions for ${filePath}: ${error.message}`);
  }
}

function setOwnership(filePath) {
  try {
    if (!isWindows) {
      // Try to detect web server user
      const webUsers = ['www-data', 'nginx', 'apache', 'httpd'];
      
      for (const user of webUsers) {
        try {
          execSync(`id ${user}`, { stdio: 'pipe' });
          execSync(`chown -R ${user}:${user} "${filePath}"`, { stdio: 'pipe' });
          logSuccess(`Set ownership to ${user}`);
          return;
        } catch (error) {
          // User doesn't exist, try next one
        }
      }
      
      logWarning('Could not detect web server user, you may need to set ownership manually');
    }
  } catch (error) {
    logWarning(`Could not set ownership for ${filePath}: ${error.message}`);
  }
}

function clearLaravelCaches(panelDir) {
  logInfo('Clearing Laravel caches...');
  
  try {
    const commands = [
      'php artisan cache:clear',
      'php artisan view:clear',
      'php artisan config:clear'
    ];
    
    for (const command of commands) {
      try {
        execSync(command, { 
          cwd: panelDir, 
          stdio: 'pipe' 
        });
      } catch (error) {
        logWarning(`Could not run ${command}: ${error.message}`);
      }
    }
    
    logSuccess('Laravel caches cleared');
  } catch (error) {
    logWarning(`Could not clear caches: ${error.message}`);
  }
}

function updateEnvFile(panelDir, theme) {
  const envPath = path.join(panelDir, '.env');
  
  if (!fs.existsSync(envPath)) {
    logWarning('.env file not found, you will need to add the theme configuration manually');
    return;
  }
  
  try {
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Check if THEME is already set
    if (envContent.includes('THEME=')) {
      envContent = envContent.replace(/THEME=.*/, `THEME=${theme}`);
    } else {
      envContent += `\nTHEME=${theme}\n`;
    }
    
    fs.writeFileSync(envPath, envContent);
    logSuccess(`Updated .env file with THEME=${theme}`);
  } catch (error) {
    logWarning(`Could not update .env file: ${error.message}`);
  }
}

function main() {
  log('🎨 Pterodactyl Advanced Themes Installer', 'cyan');
  log('=====================================', 'cyan');
  
  // Find Pterodactyl directory
  let panelDir = findPterodactylDirectory();
  
  if (!panelDir) {
    logError('Could not automatically detect Pterodactyl Panel directory.');
    logInfo('Please run this script from your Pterodactyl Panel directory or specify the path manually.');
    process.exit(1);
  }
  
  logSuccess(`Found Pterodactyl Panel at: ${panelDir}`);
  
  // Check if themes directory exists
  const themesDir = path.join(panelDir, 'public', 'themes');
  if (!fs.existsSync(themesDir)) {
    logInfo('Creating themes directory...');
    fs.mkdirSync(themesDir, { recursive: true });
  }
  
  // Install themes
  const themes = ['advanced-dark', 'advanced-light'];
  
  for (const theme of themes) {
    const srcDir = path.join(__dirname, '..', 'themes', theme);
    const destDir = path.join(themesDir, theme);
    
    if (!fs.existsSync(srcDir)) {
      logError(`Theme directory not found: ${srcDir}`);
      continue;
    }
    
    logInfo(`Installing ${theme} theme...`);
    copyDirectory(srcDir, destDir);
    setPermissions(destDir);
    logSuccess(`${theme} theme installed successfully`);
  }
  
  // Set ownership
  setOwnership(themesDir);
  
  // Clear Laravel caches
  clearLaravelCaches(panelDir);
  
  // Theme selection
  log('\n🎨 Theme Selection', 'magenta');
  log('================', 'magenta');
  log('1. Advanced Dark Theme');
  log('2. Advanced Light Theme');
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('\nWhich theme would you like to activate? (1/2): ', (answer) => {
    const themeMap = {
      '1': 'advanced-dark',
      '2': 'advanced-light'
    };
    
    const selectedTheme = themeMap[answer];
    
    if (selectedTheme) {
      updateEnvFile(panelDir, selectedTheme);
      logSuccess(`Activated ${selectedTheme} theme`);
    } else {
      logWarning('No theme selected. You can configure it later.');
    }
    
    log('\n✅ Installation completed successfully!', 'green');
    log('\n📋 Next steps:', 'blue');
    log('1. Restart your web server (nginx/apache)');
    log('2. Clear your browser cache and refresh the panel');
    log('3. Check the README.md for more information');
    log('\n🎉 Enjoy your new advanced Pterodactyl Panel theme!', 'cyan');
    
    rl.close();
  });
}

// Handle errors
process.on('uncaughtException', (error) => {
  logError(`Uncaught exception: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logError(`Unhandled rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

// Run the installer
if (require.main === module) {
  main();
}

module.exports = { main, findPterodactylDirectory, copyDirectory };
