'use strict';
import { body } from './refs';

export function toggleTheme() {
  let currentTheme = '';
  if (body.classList.contains('theme-light')) {
    currentTheme = 'theme-dark';
  } else {
    currentTheme = 'theme-light';
  }
  body.classList.replace(oppositeTheme(currentTheme), currentTheme);
  return currentTheme;
}

function oppositeTheme(theme) {
  return theme === 'theme-dark' ? 'theme-light' : 'theme-dark';
}

export function setTheme(theme) {
  if (!body.classList.contains(theme)) {
    body.classList.add(theme);
  }
  body.classList.remove(oppositeTheme(theme));
}
