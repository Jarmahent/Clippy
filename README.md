# Clippy Using Electron React BoilerPlate v(a0.64.9)

[![CircleCI](https://circleci.com/gh/Jarmahent/Clippy.svg?style=svg)](https://circleci.com/gh/Jarmahent/Clippy)

### Android has it, why can't you?

Clippy is a dynamic clipboarding app that tracks everything you have copied, incuding images(to be) and text.

`This app is in Alpha and has ALOT of bugs!`
But if you wish to download it anyways:

### MAC OSX [[Download Link]](https://www.dropbox.com/s/dxw0o0t8mix8kml/Clippy-0.64.9-mac.zip?dl=0)

#### Built on High Sierra Version `10.13.6`

### Windows [[Download Link]](https://www.dropbox.com/s/mdz3a8r0hc020u8/Clippy%200.64.9.zip?dl=0)

#### Built on Windows 10 build # `17134.228`

---

# Patch notes as of v(a.0.64.9)

### `v(a0.64.9)` Changes:

`-- Updated package.json file to reflect more acurate version number`

### `v(a0.74.9)` Changes:

`-- Added minimize button to window`

---

## **Todo:**

- [x] Figure out why node gyp wont build some packages

// It didnt build because xcode command line tools weren't enabled,
// to enable them install xcode and do: sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

- [x] Add minimize option to the copytable view
      // Added in v(a0.74.9)

- [ ] IMPORTANT: Add ability for image copies to show on the table

- [ ] Add Feature to connect Clippy to a backend server to access clipboard datafrom anywhere

  // This feature is being worked on [here](https://github.com/Jarmahent/ClippyBackEnd)

- [x] Why node gyp wont build some packages on windows with electron-rebuilder

      // Work around, delete all node modules and run yarn again.

- [ ] Fix all eslint errors, currently they are being ignored with /_ eslint-disable _/

- [ ] Redo all of the styling to make the UI look better

- [ ] Bug: If there are 2 screens and the icon is clicked it will split among the two screens
