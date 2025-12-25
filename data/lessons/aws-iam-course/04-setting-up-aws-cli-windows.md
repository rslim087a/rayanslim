---
sectionIndex: 1
name: Setting up AWS CLI (Windows)
metaDescription: Install and configure the AWS Command Line Interface (CLI) on Windows to manage your AWS resources from Command Prompt or PowerShell.
---

# Setting up AWS CLI (Windows)

This guide will walk you through the process of installing and configuring the AWS Command Line Interface (CLI) on Windows.

## Installing AWS CLI

1. Download the AWS CLI MSI installer for Windows (64-bit) from the [official AWS CLI website](https://awscli.amazonaws.com/AWSCLIV2.msi).

2. Run the downloaded **MSI installer** and follow the on-screen instructions.

3. After installation, open a new Command Prompt or PowerShell window to ensure the PATH is updated.

4. To verify that AWS CLI is installed correctly, open a new Command Prompt/PowerShell, and run the following command:

```bash
aws --version
```

You should see output similar to:

```
aws-cli/2.x.y Python/3.x.y Windows/xx exe/AMD64
```

---

If you see the version output, AWS CLI is successfully installed! Next, you'll configure it with your IAM user credentials.
