💻 1. Hosting Setup

Where and how did you host your app?
 I hosted my App on the CampusCloud with the instructions of Timon Schneider he sent on Teams, The instance is called CCL2_new. I did build my frontend (npm run build) into the backend with a dist.
I will submit my repository without the campuscloud changes so it can run without problems in the browser, I did the changes for the CC on my local pc and uploaded it that way, I hope thats fine.

What tools/services did you use for you app?
I used an external api to get the weapons into my db from a fan api from elden ring. And I used ChatGPT to help me do this project faster. 

How did you deploy the frontend and backend?
I have one backend folder where i have the backend and one frontend folder where i run my frontend. For the CC i only use the backend with a frontend folder inside with the build frontend.


Project Architecture:

/backend
    ├── controllers/(build, weapons, users)
    ├── models/(build, weapons, users)
    ├── routes/(builds, index, users, weapons)
    └── services/(auth, db, websocket)
/frontend
    ├── public/(images)
    ├── src/components/(pages)
    ├── src/services/(apiService)
    └── src/styles/(CSS)

User Interaction Overview:

Apps Purpose: My Apps purpose is just to create a Build and share them, which weapons you like on which character, and what builds you ran in the game.
Features: Create an Account, Create a Build, go to Profile/MyBuilds click on your Build and share it, go to the browse page and look at your build.
Main Flow: Login/Register --> Browse For Builds (Like Builds) --> Create Build (Choose Character, Build-Name and 6 Weapons) --> Save Builds and Share them

