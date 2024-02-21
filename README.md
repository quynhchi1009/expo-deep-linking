In eas.json I have many different profiles.
1. profile is "development", which is configured to create a development build for the iOS simulator, create an apk file for Android and set up an internal distribution.
2. profile is "preview" which is configured to create an apk file for Android and set up an internal distribution.

Run the command as shown below to run the build for the first profile:
eas build --profile development --platform ios
