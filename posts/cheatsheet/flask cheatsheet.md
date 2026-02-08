---
title: "Flask Cheatsheet"
date: 2024-06-07
tags: 
  - "Cheatsheet"
---
The most common Flask project file structure follows a modular approach that separates concerns and organizes files in a way that scales well with project size. Here's a typical structure:

```
your_flask_project/
├── app/
│   ├── __init__.py
│   ├── routes.py
│   ├── models.py
│   ├── forms.py
│   ├── templates/
│   │   └── register.html
│   ├── static/
│   │   ├── style.css
│   │   └── script.js
│   └── extensions.py (if needed for initializing extensions like SQLAlchemy, etc.)
├── migrations/ (if using a database and Flask-Migrate)
├── tests/
│   ├── __init__.py
│   ├── test_basic.py
│   └── test_models.py
├── config.py
├── .env (for environment variables)
├── requirements.txt
├── run.py (or wsgi.py)
└── README.md
```

### Explanation of each part:

1. **app/**: The main application package.
    - **__init__.py**: Initializes the Flask app and registers blueprints.
    - **routes.py**: Contains route definitions.
    - **models.py**: Contains database models.
    - **forms.py**: Contains forms (if using Flask-WTF for forms).
    - **templates/**: Directory for HTML templates.
    - **static/**: Directory for static files like CSS, JavaScript, images.
    - **extensions.py**: For initializing and configuring Flask extensions (optional).

2. **migrations/**: Directory for database migrations (if using Flask-Migrate).

3. **tests/**: Directory for unit tests.
    - **__init__.py**: Initializes the tests package.
    - **test_basic.py**: Contains basic tests.
    - **test_models.py**: Contains tests for models.

4. **config.py**: Configuration file for different environments (development, testing, production).

5. **.env**: File for environment variables (optional, used with python-dotenv).

6. **requirements.txt**: Lists project dependencies.

7. **run.py**: Entry point for running the app.

8. **README.md**: Project documentation.

### Example code for each part:

#### app/__init__.py

```python
from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    with app.app_context():
        from . import routes
        # Initialize extensions
        # db.init_app(app)
        # login_manager.init_app(app)

    return app
```

#### app/routes.py

```python
from flask import render_template, request, jsonify
from . import app
from .models import User

in_memory_db = {}

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    elif request.method == 'POST':
        username = request.form['username']
        return handle_registration(username)

def handle_registration(username):
    if username not in in_memory_db:
        new_user = User(username=username)
        in_memory_db[username] = new_user
        response = {'message': 'User registered successfully!'}
    else:
        response = {'message': 'User already exists!'}
    
    return jsonify(response)
```

#### app/models.py

```python
from dataclasses import dataclass

@dataclass
class User:
    username: str
```

#### app/templates/register.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>User Registration</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>

<body>
    <div class="form-container">
        <h2>Username:</h2>
        <input type="text" name="username" id="username" value="{{ username }}" />
        <button type="button" onclick="registerUser()">Register</button>
    </div>
    <div id="response-container"></div>
    <script src="{{ url_for('static', filename='script.js') }}"></script>
</body>

</html>
```

#### app/static/style.css

```css
body {
    font-family: Arial, sans-serif;
}

.form-container {
    margin: 20px;
}

h2 {
    margin-bottom: 10px;
}

input {
    margin-bottom: 10px;
    padding: 5px;
    width: 200px;
}

button {
    padding: 5px 10px;
    cursor: pointer;
}

#response-container {
    margin-top: 20px;
    white-space: pre-wrap;
}
```

#### app/static/script.js

```javascript
async function registerUser() {
    const username = document.getElementById('username').value;

    if (!username) {
        return;
    }
    const formData = new FormData();
    formData.append("username", username);
    const resp = await fetch("/register", {
        method: "POST",
        body: formData
    });

    const opts = await resp.json();
    
    const responseContainer = document.getElementById('response-container');
    responseContainer.innerHTML = `<pre>${JSON.stringify(opts, null, 2)}</pre>`;
}
```

#### config.py

```python
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    # Other configuration variables
```

#### run.py

```python
from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
```

This structure helps keep your project organized and maintainable as it grows.