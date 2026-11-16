---
title: "Github action pass values between steps"
date: 2024-07-05
tags: 
  - "Cheatsheet/Github"
---
To pass values between steps in a GitHub workflow, there are a few effective methods:

1. Output parameters:
   This is the recommended and most straightforward way.

   ```yaml
   steps:
     - name: Set output
       id: step1
       run: echo "output1=hello" >> $GITHUB_OUTPUT

     - name: Use output
       run: echo "${{ steps.step1.outputs.output1 }}"
   ```

2. Environment variables:
   You can set and use environment variables across steps.

   ```yaml
   steps:
     - name: Set env variable
       run: echo "MY_VAR=hello" >> $GITHUB_ENV

     - name: Use env variable
       run: echo $MY_VAR
   ```

3. Artifacts:
   For larger amounts of data, you can use artifacts.

   ```yaml
   steps:
     - name: Save artifact
       run: echo "hello" > output.txt
       
     - uses: actions/upload-artifact@v3
       with:
         name: my-artifact
         path: output.txt

     - uses: actions/download-artifact@v3
       with:
         name: my-artifact

     - name: Use artifact
       run: cat output.txt
   ```

Regarding `set-output`, it is indeed deprecated. GitHub announced its deprecation in favor of the `$GITHUB_OUTPUT` environment file. The `::set-output` syntax will be removed in the future, so it's best to use the `$GITHUB_OUTPUT` method instead.



While both $GITHUB_OUTPUT and $GITHUB_ENV are environment files used in GitHub Actions, they serve different purposes:

1. $GITHUB_OUTPUT:
   - Used to set output parameters for a step
   - These outputs can be accessed by other steps within the same job
   - Syntax: `echo "output_name=value" >> $GITHUB_OUTPUT`
   - Access: `${{ steps.step_id.outputs.output_name }}`

2. $GITHUB_ENV:
   - Used to set environment variables
   - These variables are available to all subsequent steps in the same job
   - Syntax: `echo "ENV_VAR_NAME=value" >> $GITHUB_ENV`
   - Access: `${{ env.ENV_VAR_NAME }}` or directly as `$ENV_VAR_NAME` in shell commands

Key differences:

1. Scope:
   - $GITHUB_OUTPUT is step-scoped (available to subsequent steps, but must be explicitly referenced)
   - $GITHUB_ENV is job-scoped (available to all subsequent steps without explicit reference)

2. Usage:
   - $GITHUB_OUTPUT is typically used for passing specific values between steps
   - $GITHUB_ENV is used for setting broader environment variables

3. Access method:
   - $GITHUB_OUTPUT values are accessed through the `steps` context
   - $GITHUB_ENV values are accessed through the `env` context or directly in shell commands

Example of using both:

```yaml
jobs:
  example_job:
    runs-on: ubuntu-latest
    steps:
      - name: Set output and env
        id: step1
        run: |
          echo "step_output=Hello from output" >> $GITHUB_OUTPUT
          echo "STEP_ENV=Hello from env" >> $GITHUB_ENV

      - name: Use output and env
        run: |
          echo "Output: ${{ steps.step1.outputs.step_output }}"
          echo "Env: ${{ env.STEP_ENV }}"
          echo "Direct env access: $STEP_ENV"
```

In this example, `step_output` is set using $GITHUB_OUTPUT and accessed via the `steps` context, while `STEP_ENV` is set using $GITHUB_ENV and can be accessed via the `env` context or directly as an environment variable.


## How to publish to Github Marketplace
Publishing an action to the GitHub Marketplace involves several steps. Here's a guide on how to set up and publish your `combine-files` action:

1. Create a new repository:
   - Name it descriptively, e.g., "combine-files-action"
   - Make it public
   - Initialize with a README

2. Structure your repository:
   - Root directory
     - action.yml (rename combine-files.yml to action.yml)
     - README.md
     - LICENSE (choose an open-source license, MIT is common)

3. Modify action.yml:
   - Ensure it's in the root directory
   - Add branding (optional but recommended):
     ```yaml
     branding:
       icon: 'file-text'  # Choose an appropriate icon
       color: 'blue'      # Choose a color
     ```

4. Create a good README.md:
   - Describe what the action does
   - Provide usage examples
   - List inputs and outputs
   - Include any necessary setup steps

5. Version your action:
   - Create a new release in GitHub
   - Use semantic versioning (e.g., v1.0.0)
   - Tag your release (e.g., v1, v1.0, v1.0.0)

6. Set permissions:
   - Your repository must be public
   - Go to repository settings > Actions > General
   - Under "Workflow permissions", select "Read and write permissions"

7. Publish to Marketplace:
   - Go to your repository on GitHub
   - Click on "Releases"
   - Click on "Draft a new release"
   - Choose your tag version
   - Fill in the release details
   - Check "Publish this Action to the GitHub Marketplace"
   - Agree to the GitHub Marketplace Developer Agreement
   - Click "Publish release"

Example `action.yml`:

```yaml
name: 'Combine Files'
description: 'Combines two files into one output file'
author: 'Your Name'
inputs:
  file1:
    description: 'First input file'
    required: true
  file2:
    description: 'Second input file'
    required: true
  output:
    description: 'Output file name'
    required: true
runs:
  using: 'composite'
  steps:
    - run: |
        cat "${{ inputs.file1 }}" "${{ inputs.file2 }}" > "${{ inputs.output }}"
      shell: bash
branding:
  icon: 'file-text'
  color: 'blue'
```

Example README.md content:

```markdown
# Combine Files Action

This action combines two input files into a single output file.

## Inputs

- `file1`: Path to the first input file
- `file2`: Path to the second input file
- `output`: Path for the output file

## Usage

```yaml
steps:
- uses: yourusername/combine-files-action@v1
  with:
    file1: 'path/to/file1.txt'
    file2: 'path/to/file2.txt'
    output: 'path/to/output.txt'
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

After publishing, users can reference your action in their workflows using `yourusername/combine-files-action@v1`.

Remember to test your action thoroughly before publishing. You might want to use it in a few of your own projects first to ensure it works as expected.


Great question. The `runs` section in `action.yml` defines how the action executes. There are several options available, depending on the type of action you're creating. Here are the main types and their associated options:

1. Composite Actions:
   ```yaml
   runs:
     using: "composite"
     steps:
       - run: <command>
         shell: bash|pwsh|python|sh|cmd
       - uses: <action>
   ```

2. JavaScript Actions:
   ```yaml
   runs:
     using: "node16" # or "node12", "node14", "node20"
     main: "index.js"
     pre: "setup.js" # optional
     pre-if: <condition> # optional
     post: "cleanup.js" # optional
     post-if: <condition> # optional
   ```

3. Docker Container Actions:
   ```yaml
   runs:
     using: "docker"
     image: "Dockerfile"
     # or
     image: "docker://image:tag"
     env: # optional
       KEY: value
     entrypoint: # optional
     args: # optional
     pre-entrypoint: # optional
   ```

Let's break down some key options:

- `using`: Specifies the runtime environment. Options are "composite", "node12", "node14", "node16", "node20", or "docker".

- For Composite Actions:
  - `steps`: A list of steps to execute, similar to workflow steps.
  - `shell`: Specifies the shell to use for running commands.

- For JavaScript Actions:
  - `main`: The entry point for your JavaScript action.
  - `pre`/`post`: Optional setup and cleanup scripts.
  - `pre-if`/`post-if`: Conditions for running pre/post scripts.

- For Docker Actions:
  - `image`: Can be a Dockerfile in the repository or a Docker Hub image.
  - `env`: Environment variables for the container.
  - `entrypoint`: Overrides the Docker entrypoint.
  - `args`: Arguments to pass to the container.

Here's an example of a more complex composite action:

```yaml
runs:
  using: "composite"
  steps:
    - run: echo "Preparing environment"
      shell: bash
    - uses: actions/setup-node@v3
      with:
        node-version: '14'
    - run: |
        npm install
        npm run build
      shell: bash
    - run: python script.py
      shell: python
```

This composite action runs a bash command, uses another action to set up Node.js, runs some npm commands, and then executes a Python script.


## Example to use bash 

Excellent question! If you want to use a script file in a subdirectory for a composite action, you can definitely do that. Here's how your `action.yml` would look:

```yaml
name: 'Your Action Name'
description: 'Description of your action'
inputs:
  input1:
    description: 'Description of input1'
    required: true
  input2:
    description: 'Description of input2'
    required: true
runs:
  using: "composite"
  steps:
    - name: Run custom script
      run: ${{ github.action_path }}/src/test.sh
      shell: bash
      env:
        INPUT1: ${{ inputs.input1 }}
        INPUT2: ${{ inputs.input2 }}
```

Key points:

1. We use `${{ github.action_path }}` to reference the root directory of your action. This ensures the correct path is used regardless of where the action is called from.

2. The `shell: bash` specifier is necessary for composite actions to indicate which shell should run the script.

3. We pass inputs to the script as environment variables. You can access these in your `test.sh` script using `$INPUT1` and `$INPUT2`.

Your repository structure would look like this:

```
your-action-repo/
├── action.yml
└── src/
    └── test.sh
```

Regarding repository checkout:

When someone uses your action in their workflow, they don't need to explicitly check out your action's repository. GitHub Actions automatically fetches the action's code when it's referenced in a workflow.

However, there's a caveat:

- If the workflow using your action needs to access files from its own repository (not your action's repository), it would still need to use `actions/checkout`.

For example, if someone uses your action like this:

```yaml
jobs:
  example-job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Use Your Action
        uses: your-username/your-action-repo@v1
        with:
          input1: 'value1'
          input2: 'value2'
```

They would need the checkout step if their `input1` or `input2` referred to files in their repository, or if they needed to do anything with their repository files before or after your action runs.

Your `test.sh` script might look something like this:

```bash
#!/bin/bash

echo "Input 1: $INPUT1"
echo "Input 2: $INPUT2"

# Your script logic here
```

Remember to make your script executable (`chmod +x src/test.sh`) before committing it to your repository.





