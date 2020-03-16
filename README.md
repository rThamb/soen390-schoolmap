# soen390-schoolmap

Concordia School Map project built with Ionic Framework.

## Prereq and Installation

1. Node.js (latest version: https://nodejs.org/en/)
2. Ionic (latest version (5.4.14): "npm install -g ionic")


## How to run

ON WINDOWS:

1. Clone this repo. "git clone <url>"

2. Set the project directory as your working directory. "cd soen390-schoolmap"

3. Pull all dependencies. "npm install"

4. Build the project. "npm build"

5. Run the application. "ionic serve"

The project will be deployed onto localhost:8100. If you run into problems, message the team.

ON MAC:

1. Clone this repo. "git clone <url>"

2. Set the project directory as your working directory. "cd soen390-schoolmap"

3. npm i -D -E @angular/cli

5. Run the application. "ionic serve"

**Deploying the app onto an Android device :

1. Ensure you have Java JDK 8, Android Studio and updated Android SDK tools, platforms and component dependencies.

2. Open Android Studio.

3. Click Tools & select SDK Manager.

4. Install the most recent Android versions found in Android SDK (should have at least Android 8.0 and above).

5. Plug your Android device into your PC.

6. Ensure that Developer Mode is enabled on your device (quick google search can help with this).

7. Change to your codes directory and run the following command: ionic cordova run android --device

 **For simulator (mobile) view, run :
    ionic cordova build ios
    ionic cordova emulate ios

The project will be deployed onto localhost:8101. If you run into problems, message the team.

## How to Deploy to Android Device

1. Ensure you have Java JDK8, Android Studio and updated Android SDK tools, platform and component dependencies.

2. Open Android Studio, select tools, click on SDK manager and install the most recent versions of android (must have at least Android 8.0).

3. Plug in your Android device to your PC and enabled developer mode.

4. Open a terminal and select the directory which the project is stored in.

5. Run the following command: ionic cordova run android --device

6. If your phone is unlocked it should take about 30 seconds for the app to appear and be installed onto your device.

## Learn Ionic Framework 

Please watch the following video to learn the fundamentals of the ionic framework. https://www.youtube.com/watch?v=r2ga-iXS5i4&t=1339s. 
If you're familiar with Angular 2+, the first hour should be enough.

## Generating Components

Similar to Angular, components are generated using a command. (ng generate ... ). Ionic comes with a similar command to generate ionic components. (ionic generate type name).

Please read https://ionicframework.com/docs/cli/commands/generate for more info.

## Prebuilt UI Components

Ionic comes built with some existing UI components that will make it easier for us to build our UI. 
Visit: https://ionicframework.com/docs/components


