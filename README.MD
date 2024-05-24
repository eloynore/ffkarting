# START BACKEND

```powershell
cd .\backend\
.\venv\Scripts\activate
```

If you made changes on any model you should run first this 2 commands:

```powershell
python.exe .\manage.py makemigrations
python.exe .\manage.py migrate
```

You can remove the IP if you want since I am using the local network to test on smartphone.If not you can skip to this one:

```powershell
python .\manage.py runserver 0.0.0.0:8000
```

# START FRONTEND

```powershell
cd .\frontend\
npm run start
```
