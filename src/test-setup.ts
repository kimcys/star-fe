// Global test setup, run before every spec file.
//
// The Vitest runner used by `ng test` shares one process/global state
// across all spec files by default (`isolate: false`), so anything a
// test writes to real browser globals like `localStorage` or
// `document.documentElement`'s class list would otherwise leak into
// every test that runs afterwards, in any file. `ThemeService`
// persists to `localStorage` and toggles a `dark` class on
// `<html>`, so this resets both after every test.
afterEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});
