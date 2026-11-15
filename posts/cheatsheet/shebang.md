---
title: "bash / sh shebang"
date: 2024-07-20
tags: 
  - "Cheatsheet/shebang"
---
The shebang (`#!`) has several uses beyond specifying the interpreter for Python or shell scripts. Here are some other common use cases:

1. **Other Programming Languages:**
   - Perl: `#!/usr/bin/perl`
   - Ruby: `#!/usr/bin/env ruby`
   - Node.js: `#!/usr/bin/env node`
   - PHP: `#!/usr/bin/php`

2. **Scripting Languages:**
   - Awk: `#!/usr/bin/awk -f`
   - Sed: `#!/usr/bin/sed -f`

3. **System Utilities:**
   - Makefiles: `#!/usr/bin/make -f`
   - Expect scripts: `#!/usr/bin/expect -f`
   - Tcl scripts: `#!/usr/bin/tclsh`

4. **Configuration and Automation Tools:**
   - Ansible: `#!/usr/bin/env ansible-playbook`
   - Terraform: `#!/usr/bin/env terraform`

5. **Text Processing:**
   - Vim scripts: `#!/usr/bin/env vim -s`
   - Emacs Lisp: `#!/usr/bin/emacs --script`

6. **Custom Scripts:**
   - Docker Compose: `#!/usr/bin/env docker-compose`

7. **Multiple Commands or Options:**
   - Specifying options directly in the shebang:
     ```sh
     #!/bin/bash -e
     ```
     Here, `-e` makes the script exit immediately if a command exits with a non-zero status.

8. **Portable Scripts:**
   - Using `/usr/bin/env` for portability:
     ```sh
     #!/usr/bin/env python3
     ```
     This approach ensures that the script uses the interpreter from the user's environment, making it more portable across different systems.

In summary, the shebang is a versatile tool used to specify the interpreter for a wide variety of languages and tools, making scripts executable and ensuring they run with the correct interpreter and options.