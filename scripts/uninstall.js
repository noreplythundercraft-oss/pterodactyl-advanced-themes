#!/usr/bin/env node

/**
 * Pterodactyl Advanced Themes Uninstallation Script
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

function removeDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return false;
  }
  
  try {
    if (fs.statSync(dirPath).isDirectory()) {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        if (fs.statSync(itemPath).isDirectory()) {
          removeDirectory(itemPath);
        } else {
          fs.unlinkSync(itemPath);
        }
      }
      
      fs.rmdirSync(dirPath);
    } else {
      fs.unlinkSync(dirPath);
    }
    
    return true;
  } catch (error) {
    logError(`Could not remove ${dirPath}: ${error.message}`);
    return false;
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

function updateEnvFile(panelDir) {
  const envPath = path.join(panelDir, '.env');
  
  if (!fs.existsSync(envPath)) {
    logWarning('.env file not found');
    return;
  }
  
  try {
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Remove THEME configuration
    if (envContent.includes('THEME=')) {
      envContent = envContent.replace(/THEME=.*\n?/, '');
      fs.writeFileSync(envPath, envContent);
      logSuccess('Removed theme configuration from .env file');
    }
  } catch (error) {
    logWarning(`Could not update .env file: ${error.message}`);
  }
}

function main() {
  log('🗑️  Pterodactyl Advanced Themes Uninstaller', 'red');
  log('==========================================', 'red');
  
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
    logWarning('Themes directory not found. Nothing to uninstall.');
    return;
  }
  
  // List installed themes
  const themes = ['advanced-dark', 'advanced-light'];
  const installedThemes = [];
  
  for (const theme of themes) {
    const themeDir = path.join(themesDir, theme);
    if (fs.existsSync(themeDir)) {
      installedThemes.push(theme);
    }
  }
  
  if (installedThemes.length === 0) {
    logWarning('No advanced themes found. Nothing to uninstall.');
    return;
  }
  
  logInfo(`Found installed themes: ${installedThemes.join(', ')}`);
  
  // Confirmation
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('\nAre you sure you want to uninstall all advanced themes? (y/N): ', (answer) => {
    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      logInfo('Uninstallation cancelled.');
      rl.close();
      return;
    }
    
    // Remove themes
    let removedCount = 0;
    
    for (const theme of installedThemes) {
      const themeDir = path.join(themesDir, theme);
      logInfo(`Removing ${theme} theme...`);
      
      if (removeDirectory(themeDir)) {
        logSuccess(`${theme} theme removed successfully`);
        removedCount++;
      } else {
        logError(`Failed to remove ${theme} theme`);
      }
    }
    
    // Check if themes directory is empty
    try {
      const remainingItems = fs.readdirSync(themesDir);
      if (remainingItems.length === 0) {
        logInfo('Themes directory is empty, removing...');
        fs.rmdirSync(themesDir);
        logSuccess('Themes directory removed');
      }
    } catch (error) {
      logWarning(`Could not remove themes directory: ${error.message}`);
    }
    
    // Clear Laravel caches
    clearLaravelCaches(panelDir);
    
    // Update .env file
    updateEnvFile(panelDir);
    
    log(`\n✅ Uninstallation completed!`, 'green');
    log(`Removed ${removedCount} theme(s)`, 'blue');
    log('\n📋 Next steps:', 'blue');
    log('1. Restart your web server (nginx/apache)');
    log('2. Clear your browser cache and refresh the panel');
    log('3. Your panel will now use the default theme');
    
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

// Run the uninstaller
if (require.main === module) {
  main();
}

module.exports = { main, findPterodactylDirectory, removeDirectory };
