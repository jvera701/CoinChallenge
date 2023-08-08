# ChallengeProject App

This is Jose Alejandro Vera CoinChallenge app. It is an ios and android app.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run the project locally you need this:

- [NodeJS](https://nodejs.org/en/) now using v18.16.1
- [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
- [Android Studio](https://developer.android.com/studio)
- [CocoaPods with homebrew](https://formulae.brew.sh/formula/cocoapods) Now using v 1.12.1
- Xcode >= 14.0 ( Required MacOs >= 12.6)

## Installation

Install Node dependencies.

```bash
npm install
```

## iOS

For iOS: Install pods dependencies into the `ios` folder.

```bash
cd ios
pod install
```

If the pod install step fails, it may be related to no default xcode in the computer, try running this command:

```bash
sudo xcode-select --switch /Applications/Xcode.app
```

## Android Build dependencies

Install watchman:

```bash
brew install watchman
```

Install Recommended JDK:

```bash
brew tap homebrew/cask-versions
brew install --cask zulu11
```

Install Android Studio [download](https://developer.android.com/studio):

While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- Android SDK
- Android SDK Platform
- Android Virtual Device

Open the project in Android Studio, make sure you select the CoinChallenge/android/app directory

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 12 (S) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

The SDK Manager can be found within the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 12 (S) entry, then make sure the following items are checked:

- Android SDK Platform 31
- "Intel x86 Atom_64 System Image" or "Google APIs Intel x86 Atom System Image" or (for Apple M1 Silicon) "Google APIs ARM 64 v8a System Image"

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 31.0.0 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

Configure the ANDROID_SDK_ROOT environment variable:

The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your $HOME/.bash_profile or $HOME/.bashrc (if you are using zsh then ~/.zprofile or ~/.zshrc) config file:

```bash
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
export JAVA_HOME=$(/usr/libexec/java_home -v 11.0.15)
export ANDROID_HOME=$HOME/Library/Android/sdk
```

Type source $HOME/.bash_profile for bash or source $HOME/.zprofile to load the config into your current shell. Verify that ANDROID_SDK_ROOT has been set by running echo $ANDROID_SDK_ROOT and the appropriate directories have been added to your path by running echo $PATH.

Please make sure you use the correct Android SDK path. You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK.

Finally, Open Android Studio and create a New Emulator.

To run the android app run:

```bash
npm run android
```

You may also run the Project in Android Studio if you wish to do so.

## Scripts available

To run iOS app you can use some of the following scripts:

```bash
npm run ios
```

To run unit tests

```bash
npm run test
```

To run tests with coverage

```bash
npm run coverage
```

To run and check linter rules

```bash
npm run lint
```

## Folder Structure

```
/src
   /api - Folder with all api calls
   /components - Folder with all components
   __tests__ - Folder with the specific component test
      example-component.spec.tsx
   example-component.tsx
   example-component.styles.ts
   /navigation - Folder that defines the Native Stack Navigator
   /screens - Folder with each screen
   /store - Folder with all files in a RTK store
   App.tsx - app entry point
```

## Architecture

- Used redux with RTK because of its extensibility and performance
- Each component has it's own unit test
- Used ESLinter with additional plugins such as @react-native-community
- Added pre commit hooks so that the code can only be committed after linting and after the code passes tests
- Used Fuse library to do fuzzy search when searching coin

## Optimization techniques used

The app uses the following advanced optimization techniques:

- memo in currency row component

In the home page the following were used

- useCallback hook to cache the function in render list
- used getItemLayout to define the currency row height
- used keyExtractor to extract a unique key for a given item at the specified index.
