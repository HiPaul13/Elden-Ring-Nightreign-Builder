## 🧾 Instructions for Teacher

This file must be submitted with your final project. If any of the required information is missing or incomplete, you will receive **0 points** for your development documentation — no exceptions.

---

### ▶️ 1. Setup Instructions (Copy-paste Ready)

#### How to clone your repository:
```bash
# Replace with your actual repository link
# Make sure I actually have access in Gitlab
git clone <https://git.nwt.fhstp.ac.at/ccl2_hitzl_paul_cc241055/ss2025_ccl_cc241055.git>



List the exact commands needed to install and start both backend and frontend:

```bash
# Backend setup
cd backend
npm install
node app.js

# Frontend setup
cd frontend
npm install
npm run dev


Add any environment variables or `.env` file setup notes if required - here's an example:

```bash
# Environment setup (if needed)
Create a file called .env in /backend and add the following:
DB_USERNAME = cc241055
DB_PASSWORD = Jb1+Fs0!Yt8!
ACCESS_TOKEN_SECRET=022304cac94aff7f605434eec3751c4b0a371f5e3855b8198485b6d0861a5facd75221963a4e2aa3a28bcd89e189d6995f1725aab64d8855f289ac810d2c966f


---

### 🔑 2. Credentials

#### Database Access (if applicable):
```
User: cc241055
Password: Jb1+Fs0!Yt8!
Database Name: cc241055
```


#### The link(s) to your instance(s):
```
Backend: https://cc241055-10801.node.fhstp.cc

```

#### Admin Login (There is no difference between admin or normal user so just register) - create this in your app:
```
Email: admin@nightreign.com
Password: admin
```

#### Two Normal Users:
```
User 1 Email: hannes@nightreign.com 
User 1 Password: hannes

User 2 Email: laurens@nightreign.com    
User 2 Password: laurens
```

---

### 🧭 3. User Flow / Grading Instructions

Provide a clear walkthrough for testing your app - here's an example:

1. Login or register with a normal user.
2. Visit the homepage (browseBuilds) at: [https://cc241055-10801.node.fhstp.cc/browse]
3. Click on Create Builds (Choose a Character and weapons for the slots, then click on "SAVE BUILD").
4. Go on Profile, click on My Builds -> clickon the created Build and click on SHare Build.
5. Now you should be on the Browse site again and see your created Build.
6. YOu can Like Builds, try out the CHat function or adjust your Profile.
7. Logout

Feel free to number the steps. Be as specific as possible. This helps ensure your app is tested fairly and accurately.

---

