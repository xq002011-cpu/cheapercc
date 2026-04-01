#!/usr/bin/env node

// CCBoss CLI Entry Point
import('../src/index.js').catch((err) => {
  console.error('Failed to start CCBoss:', err);
  process.exit(1);
});
