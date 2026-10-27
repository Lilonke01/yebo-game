# Yebo standalone phone app

The standalone app bundles the complete game, pictures and English, Afrikaans and isiZulu narration. It launches in its own app window and needs neither a browser address nor ChatGPT sign-in. All learning content is available offline from first launch. Progress is local to each installation and is not transferred from the website.

## Android

The initial direct-install build is a development APK signed with the Android debug key. It is suitable for trying the game on a phone; it is not a Google Play release. Android 7 or newer is required, with an up-to-date Android System WebView.

Transfer releases/Yebo-Android.apk to the Android phone and open it in Files. If asked, allow that file-opening app to install this APK, install Yebo, then return that permission to its previous setting. Open Yebo from its app icon. No server or separate offline download is needed. The app is about 120 MB because the illustrations and voices are bundled.

Rebuild on this computer using Build-Android.ps1. The build tools are portable under build-tools; no system-wide Java or Android SDK configuration is required. Google SDK license acceptance was explicitly authorized by the user in this chat.

A production store release still requires a privately maintained release signing key, device QA and store preparation. Keep the development key if updating a development installation; otherwise Android may require uninstalling it, which removes its saved progress.

## iPhone

The ios folder is a real Xcode project, not an installable IPA. Use a Mac with Xcode compatible with Capacitor 8.5.3. The project already contains all web assets and a Swift Package Manager dependency pinned to Capacitor 8.5.3.

1. Unzip the iPhone project archive on a Mac.
2. Open ios/App/App.xcodeproj in Xcode and allow Swift packages to resolve.
3. Select App, then Signing & Capabilities. Select your Apple development team and use a unique bundle identifier if necessary.
4. Connect an iPhone and select it as the run destination. Build and run from Xcode, following Apple's device trust/developer-mode instructions if requested.
5. For broader distribution, create an archive and use the Apple account's supported TestFlight/App Store distribution route.

Windows cannot produce or sign the iPhone installer using Xcode. No IPA has been produced and no Apple signing credentials have been configured. Neither physical iPhone nor Android device testing has been performed yet.

## Source and assets

Build-native.mjs copies the current mobile-site/dist browser build into native-app/www and replaces only the browser installation panel with an offline-ready app description. Run the Capacitor sync command for a platform after refreshing those files. Native app settings contain no remote server URL. No learner save data is bundled.

Setup audit: the SDK manager also recorded acceptance of optional SDK add-on licences when the standard SDK licence was accepted. Those optional add-ons were not installed.
