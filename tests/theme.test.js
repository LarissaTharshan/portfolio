import {test, assertEquals} from './runner.js';
import {applyTheme, resolveTheme, toggleTheme, updateThemeButton} from '../js/theme.js';

/* resolveTheme */

test('resolveTheme: gespeichertes Dunkel gewinnt gegen helles System', () => {
    assertEquals(resolveTheme('dark', false), 'dark');
});

test('resolveTheme: gespeichertes Hell gewinnt gegen dunkles System', () => {
    assertEquals(resolveTheme('light', true), 'light');
});

test('resolveTheme: ohne gespeicherte Wahl und dunklem System ergibt dark', () => {
    assertEquals(resolveTheme(null, true), 'dark');
});

test('resolveTheme: ohne gespeicherte Wahl und hellem System ergibt light', () => {
    assertEquals(resolveTheme(null, false), 'light');
});

test('resolveTheme: ungültiger gespeicherter Wert wird ignoriert', () => {
    assertEquals(resolveTheme('blau', true), 'dark');
});

/* toggleTheme */

test('toggleTheme: aus light wird dark', () => {
    assertEquals(toggleTheme('light'), 'dark');
});

test('toggleTheme: aus dark wird light', () => {
    assertEquals(toggleTheme('dark'), 'light');
});

/* applyTheme und updateThemeButton */

test('applyTheme: setzt data-theme', () => {
    const root = document.createElement('div');
    applyTheme(root, 'dark');
    assertEquals(root.getAttribute('data-theme'), 'dark');
});

test('updateThemeButton: aria-pressed ist nur bei dark true', () => {
    const button = document.createElement('button');
    updateThemeButton(button, 'dark');
    assertEquals(button.getAttribute('aria-pressed'), 'true');
    updateThemeButton(button, 'light');
    assertEquals(button.getAttribute('aria-pressed'), 'false');
});