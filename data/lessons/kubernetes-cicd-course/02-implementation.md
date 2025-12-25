---
sectionIndex: 1
name: Kubernetes CI/CD with GitHub Actions & Argo CD
metaDescription: Complete hands-on CI/CD implementation with GitHub Actions building Docker images, updating GitOps repositories, and ArgoCD automatically deploying to Kubernetes clusters.
---

# CI/CD Pipeline Implementation

<lite-youtube videoid="GlhK7mz5IJo"></lite-youtube>

## Resources from **Video Description**

* **[Application Repository](https://github.com/rslim087a/kubernetes-cicd-tutorial)** – Source app + GitHub Actions workflow (CI)
* **[GitOps Repository](https://github.com/rslim087a/grade-api-gitops)** – Kubernetes manifests tracked by Argo CD (CD)

## Key Takeaways

**Commit → Image → Deploy (End-to-End):** Changes to the app repo trigger a GitHub Actions workflow that **builds a Docker image** and **pushes to a container registry**. The workflow then **updates the GitOps repo** to reference the new image tag/sha. Argo CD detects the change and **reconciles** the cluster automatically.

**Separation of Concerns (CI vs. CD):**

* **CI (Application repo):** Build & push image, then programmatically update the GitOps manifest.
* **CD (GitOps repo):** Argo CD watches the repo and applies drift correction to the cluster.

**GitHub Actions Essentials:** Use built-in actions to check out code, authenticate to GHCR, build & push, then a script step to **edit the Deployment’s `image:` field** to the new digest. Store credentials as **repository secrets** (e.g., a registry PAT and a GitOps-repo PAT).

**Self-Hosted Runner & Docker:** The example uses a **self-hosted runner** (Docker required) to execute the workflow locally. Ensure Docker is running so the `buildx` and push steps succeed.

**Argo CD Setup & Sync:** Install Argo CD via Helm/manifests, **port-forward the `argocd-server`**, and create an **Application** pointing at the GitOps repo/path. Enable options like **auto-sync/prune/self-heal** as desired for hands-off deployments.

**Observe the Full Flow:** Make a tiny code change → workflow builds & pushes → GitOps repo gets updated → Argo CD syncs → new Pods run the latest image. You’ve got a **professional GitOps-style CI/CD** from commit to cluster.

---

