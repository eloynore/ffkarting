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

If not you can skip to this one:

```powershell
python .\manage.py runserver
```

# START FRONTEND

```powershell
cd .\frontend\
npm run start
```
