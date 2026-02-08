---
title: "Python Cheatsheet"
date: 2024-07-17
tags: 
  - "Cheatsheet/python"
---
Python cheatsheet
Create virtual environment
$ python3 -m venv venv

(to delete old virtual envionrment)
$ python3 -m venv venv --clear

To create multiple virtual environment
$ python3 -m venv venv /Users/name/virtualenvs/venv-copy

Activate virtual environment
Change to directory containing venv
$ source venv/bin/activate

Deactivate virtual environment
$ deactivate

pip install -r requirements.txt

pip freeze > requirements.txt


To ensure the required modules are loaded when running Python scripts from bash, you can use a shebang line at the top of your script and activate the virtual environment within the script. Here is a step-by-step guide:

1. **Create and activate a virtual environment**:
    ```bash
    python -m venv myenv
    source myenv/bin/activate
    ```

2. **Install the required modules**:
    ```bash
    pip install -r requirements.txt
    ```

3. **Add a shebang line to your Python script**:
    ```python
    #!/usr/bin/env python
    ```

4. **Modify the script to activate the virtual environment automatically**:
    ```python
    #!/usr/bin/env python

    import os
    import sys

    # Path to the virtual environment
    venv_path = os.path.join(os.path.dirname(__file__), 'myenv', 'bin', 'activate_this.py')

    with open(venv_path) as f:
        exec(f.read(), {'__file__': venv_path})

    # Rest of your script
    ```

5. **Make your script executable**:
    ```bash
    chmod +x your_script.py
    ```

6. **Run the script from bash**:
    ```bash
    ./your_script.py
    ```

By following these steps, your script will ensure the virtual environment is activated and the required modules are loaded before executing the rest of the script.


If you don't want to manually activate the virtual environment each time, you can automate it by wrapping your script execution within a bash script that ensures the virtual environment is activated. Here’s how to do it:

1. **Create a bash script to run your Python script**:

    ```bash
    #!/bin/bash

    # Path to your virtual environment
    VENV_PATH="path/to/your/venv"

    # Activate the virtual environment
    source "$VENV_PATH/bin/activate"

    # Run the Python script
    python path/to/your_script.py

    # Deactivate the virtual environment
    deactivate
    ```

2. **Make your bash script executable**:

    ```bash
    chmod +x run_my_script.sh
    ```

3. **Run your bash script**:

    ```bash
    ./run_my_script.sh
    ```

This way, the bash script ensures the virtual environment is activated before running your Python script and deactivated afterward. You only need to run the bash script, and it will handle the environment setup for you.


Yes, you can set environment variables within a Python script similarly to how you use `export` in bash. You can do this using the `os` module in Python. Here’s how you can do it:

1. **Setting Environment Variables in a Python Script**:

    ```python
    import os

    # Set environment variables
    os.environ['MY_VARIABLE'] = 'my_value'
    os.environ['ANOTHER_VARIABLE'] = 'another_value'

    # Verify by printing
    print(os.environ['MY_VARIABLE'])
    print(os.environ['ANOTHER_VARIABLE'])
    ```

2. **Running External Commands with the Modified Environment**:

    If you need to run external commands or scripts that require these environment variables, you can use the `subprocess` module:

    ```python
    import os
    import subprocess

    # Set environment variables
    os.environ['MY_VARIABLE'] = 'my_value'
    os.environ['ANOTHER_VARIABLE'] = 'another_value'

    # Run an external command
    result = subprocess.run(['echo', '$MY_VARIABLE'], capture_output=True, text=True, shell=True)
    print(result.stdout)
    ```

3. **Using a Context Manager for Temporary Environment Variables**:

    If you only need the environment variables to be set temporarily for a specific block of code, you can use a context manager:

    ```python
    import os
    from contextlib import contextmanager

    @contextmanager
    def set_env(**env_vars):
        original_env = os.environ.copy()
        os.environ.update(env_vars)
        try:
            yield
        finally:
            os.environ.clear()
            os.environ.update(original_env)

    with set_env(MY_VARIABLE='my_value', ANOTHER_VARIABLE='another_value'):
        # Your code here
        print(os.environ['MY_VARIABLE'])
        print(os.environ['ANOTHER_VARIABLE'])

    # Outside the context manager, the environment variables are reset
    print(os.environ.get('MY_VARIABLE'))  # This will print None
    ```

These methods allow you to set and use environment variables within your Python script, similar to exporting them in bash.



Yes, you can preload a Python script similarly to how you would source a bash function in a shell script. This can be done by creating a Python module or script that sets up the environment or performs certain actions, and then importing or running it in your main script.

Here are a few methods to preload a Python script:

### Method 1: Using Import Statements

1. **Create a Python module** (`preload.py`):

    ```python
    # preload.py

    import os

    # Set environment variables
    os.environ['MY_VARIABLE'] = 'my_value'
    os.environ['ANOTHER_VARIABLE'] = 'another_value'

    def setup():
        print("Environment variables set!")
    ```

2. **Import the module in your main script** (`main_script.py`):

    ```python
    # main_script.py

    import preload

    # Run the setup function to preload settings
    preload.setup()

    # Your main script logic here
    print(os.environ['MY_VARIABLE'])
    print(os.environ['ANOTHER_VARIABLE'])
    ```

### Method 2: Executing a Preload Script

1. **Create a preload script** (`preload.py`):

    ```python
    # preload.py

    import os

    # Set environment variables
    os.environ['MY_VARIABLE'] = 'my_value'
    os.environ['ANOTHER_VARIABLE'] = 'another_value'

    print("Environment variables set!")
    ```

2. **Execute the preload script in your main script** (`main_script.py`):

    ```python
    # main_script.py

    import os
    import subprocess

    # Execute the preload script
    subprocess.run(['python', 'preload.py'])

    # Your main script logic here
    print(os.environ['MY_VARIABLE'])
    print(os.environ['ANOTHER_VARIABLE'])
    ```

### Method 3: Using an Initialization Function

1. **Create a Python module with an initialization function** (`preload.py`):

    ```python
    # preload.py

    import os

    def initialize():
        # Set environment variables
        os.environ['MY_VARIABLE'] = 'my_value'
        os.environ['ANOTHER_VARIABLE'] = 'another_value'
        print("Environment variables set!")
    ```

2. **Call the initialization function in your main script** (`main_script.py`):

    ```python
    # main_script.py

    from preload import initialize

    # Run the initialization function to preload settings
    initialize()

    # Your main script logic here
    print(os.environ['MY_VARIABLE'])
    print(os.environ['ANOTHER_VARIABLE'])
    ```

These methods allow you to preload settings or environment variables in a Python script, similar to preloading a function in a bash script. The most common and clean approach is using an initialization function or importing a module, as it keeps your code modular and easy to maintain.
