# Clippy Using Electron React BoilerPlate v(a0.83.5)

[![CircleCI](https://circleci.com/gh/Jarmahent/Clippy.svg?style=svg)](https://circleci.com/gh/Jarmahent/Clippy)

### Android has it, why can't you?

Clippy is a dynamic clipboarding app that tracks everything you have copied, incuding images(to be) and text.

`This app is in Alpha and has ALOT of bugs!`
But if you wish to download it anyways:

### Email Me at: kevin@kevintweaks.net for a release, just ask which OS you want it for.

---

# Patch notes as of v(a.0.64.9)

### `v(a0.64.9)` Changes:

`-- Updated package.json file to reflect more acurate version number`

### `v(a0.74.9)` Changes:

`-- Added minimize button to window`

### `v(a0.83.0)` Changes:

`-- Clippy now has the ability to connect to a server which saves all of your copies to be shared between devices(this feature will be off until the server comes online)`

`-- Clippy now records images copied to the clipboard`

<aside class="warning">
Known Bug: Copying high quality images can cause Clippy to slow down very badly and will require that you clear the contents of the copied images folder and restart your computer!
</aside>

### `v(a0.83.5)` Minor Changes:

`-- Clippy no longer copies unecessary image text information`

---

## **Todo:**

- [x] Figure out why node gyp wont build some packages

// It didnt build because xcode command line tools weren't enabled,
// to enable them install xcode and do: sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

- [x] Add minimize option to the copytable view

  // Added in v(a0.74.9)

- [x] IMPORTANT: Add ability for image copies to show on the table

      // Added in v(0.83.0)

- [ ] Add Feature to connect Clippy to a backend server to access clipboard datafrom anywhere

  // This feature is being worked on [here](https://github.com/Jarmahent/ClippyBackEnd)

- [x] Why node gyp wont build some packages on windows with electron-rebuilder

      // Work around, delete all node modules and run yarn again.

- [x] Fix all eslint errors, currently they are being ignored with /_ eslint-disable _/

- [ ] Redo all of the styling to make the UI look better

- [ ] Bug: If there are 2 screens and the icon is clicked it will split among the two screens

- [ ] Bug: Copying a high resolution image causes the app to slow down dramatically

            // Idea: Down sample the preview images

- [ ] Copy images to clipboard when the image is clicked on

- [ ] Move the database event to the main.dev.js file because copying text when the main component isnt in focus will not update the database
