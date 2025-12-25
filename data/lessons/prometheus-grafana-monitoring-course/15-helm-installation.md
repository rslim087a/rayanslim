---
sectionIndex: 11
name: Installing Helm on Mac and Windows
metaDescription: Learn how to install Helm Package Manager in Mac or Windows Operating System.
---

# **Installing Helm on Mac and Windows**

This guide will walk you through installing Helm on macOS and Windows.

# **Mac**

## **Installation Steps**

1. Open Terminal on your Mac.
2. If you don't have Homebrew installed, install it first by running:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. Once Homebrew is installed, use it to install Helm:

```bash
brew install helm
```

4. Wait for the installation to complete. Homebrew will download and install Helm and its dependencies.

## **Verifying the Installation**

After the installation is complete, you should verify that Helm is installed correctly:

1. Check the Helm version by running:

```bash
helm version
```

2. You should see output similar to this:

```
version.BuildInfo{Version:"v3.x.x", GitCommit:"xxxxxxx", GitTreeState:"clean", GoVersion:"go1.xx.x"}
```

# **Windows**

## **Installation Steps**

You have two main options for installing Helm on Windows:

## **Option 1: Using Chocolatey (Recommended)**

1. If you don't have Chocolatey installed, install it first. Open PowerShell as **Administrator** and run:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

2. Once Chocolatey is installed, use it to install Helm:

```powershell
choco install kubernetes-helm
```

## **Option 2: Manual Installation**

1. Visit the official Helm GitHub releases page: https://github.com/helm/helm/releases
2. Download the Windows amd64 version (e.g., `helm-v3.x.x-windows-amd64.zip`).
3. Extract the zip file to a directory of your choice (e.g., `C:\helm`).
4. Add the directory containing `helm.exe` to your PATH environment variable:
    - Right-click on 'This PC' or 'My Computer' and select 'Properties'
    - Click on 'Advanced system settings'
    - Click on 'Environment Variables'
    - Under 'System variables', find and select 'Path', then click 'Edit'
    - Click 'New' and add the directory path (e.g., `C:\helm`)
    - Click 'OK' to close all windows

**Note**: The directory you add to the PATH should contain the `helm.exe` file. This executable is what allows you to run Helm commands from any location in the command prompt or PowerShell.

## **Verifying the Installation**

After installation, verify that Helm is installed correctly:

1. Open a new PowerShell window.
2. Check the Helm version by running:

```powershell
helm version
```

3. You should see output similar to this:

```
version.BuildInfo{Version:"v3.x.x", GitCommit:"xxxxxxx", GitTreeState:"clean", GoVersion:"go1.xx.x"}
```

# **Conclusion**

If you've seen the expected outputs in the verification steps, congratulations! Helm is now successfully installed on your system. You're ready to proceed with your Helm lesson.