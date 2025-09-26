#!/usr/bin/env node

// Custom development server script to run Vite with correct host/port configuration
import { spawn } from 'child_process';

const viteProcess = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

viteProcess.on('error', (error) => {
  console.error('Error starting Vite server:', error);
  process.exit(1);
});

viteProcess.on('exit', (code) => {
  process.exit(code);
});