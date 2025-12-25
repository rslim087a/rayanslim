---
sectionIndex: 1
name: Setting up AWS CLI (Mac)
metaDescription: Install and configure the AWS Command Line Interface (CLI) on macOS to manage your AWS resources from the terminal.
---

# Setting up AWS CLI (Mac)

This guide will walk you through the process of installing and configuring the AWS Command Line Interface (CLI) on macOS.

## Installing AWS CLI

1. Download the AWS CLI pkg installer for macOS from the [official AWS CLI website](https://awscli.amazonaws.com/AWSCLIV2.pkg).

2. Run the downloaded **pkg installer** and follow the on-screen instructions.

3. After installation, open a new Terminal window to ensure the PATH is updated.

4. To verify that AWS CLI is installed correctly, open a new terminal window, and run the following command:

```bash
aws --version
```

You should see output similar to:

```
aws-cli/2.x.y Python/3.x.y Darwin/xx.x.x x86_64
```

---

If you see the version output, AWS CLI is successfully installed! Next, you'll configure it with your IAM user credentials.
