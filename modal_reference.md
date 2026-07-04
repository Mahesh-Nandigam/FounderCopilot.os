# Create your first app

Welcome to Modal! Let's get you set up to run an app.

## 1. Download and configure the Python client

Run this in order to install the Python library locally:

```bash
$ pip install modal
$ python3 -m modal setup
```

The first command will install the Modal client library on your computer, along with its dependencies.

The second command authenticates your environment through your web browser. It will open a new tab where you simply click **"Authorize"**. You do NOT need to copy or paste any tokens. The terminal will automatically detect the authorization. You can close the tab when you are done.

## 2. Run some code

You're ready to run some code! To get started, here is a minimal script that computes the square of 42:

```python
import modal

app = modal.App("example-get-started")

@app.function()
def square(x):
    print("This code is running on a remote worker!")
    return x**2

@app.local_entrypoint()
def main():
    print("the square is", square.remote(42))
```

Save the code to a local file such as:

```bash
$ cat > get_started.py # At the prompt, paste the snippet and Ctrl-D to save it.
```

Now that the source code is saved locally, let's run it:

```bash
$ modal run get_started.py
```

Congratulations, you successfully executed a function on a remote worker!
