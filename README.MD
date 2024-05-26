# Instructions to Start the Project

## Backend (Python Django)

### Step 1: Navigate to the Backend Directory

```powershell
cd .\backend\
```

### Step 2: Activate the Virtual Environment

```powershell
.\venv\Scripts\activate
```

### Step 3: Apply Migrations (if necessary)

If you have made changes to any models, run the following commands before starting the server:

```powershell
python.exe .\manage.py makemigrations
python.exe .\manage.py migrate
```

### Step 4: Start the Development Server

To test on your local network, run the following command. You can omit the IP if you do not need to access it from another device.

```powershell
python .\manage.py runserver 0.0.0.0:8000
```

## Frontend (React)

### Step 1: Navigate to the Frontend Directory

```powershell
cd .\frontend\
```

### Step 2: Install Dependencies

```powershell
npm install
```

### Step 3: Start the Development Server

```powershell
npm run start
```

### Additional Notes:

- Make sure both servers (backend and frontend) are running simultaneously for the application to function correctly.
- You can customize the address and port of the Django server if needed. By default, 0.0.0.0:8000 allows other devices on the same network to access the server.
