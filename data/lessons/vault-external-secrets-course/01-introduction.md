---
sectionIndex: 0
name: Welcome to Vault + External Secrets Course
metaDescription: Centralize Kubernetes secret management by integrating HashiCorp Vault with External Secrets Operator for secure credential storage and automated secret rotation.
---

# Welcome to Vault + External Secrets Course

**Still hardcoding API keys in YAML? Let’s fix that—properly.**

In this hands-on course, you’ll stand up a local HashiCorp Vault and wire it to Kubernetes with the **External Secrets Operator (ESO)** so your apps get secrets **securely and automatically**—no plaintext in Git, ever.

You’ll configure a **versioned KV engine** in Vault, connect Kubernetes via a **ClusterSecretStore**, and generate real **Kubernetes Secrets** from Vault data using **ExternalSecret** resources. Finally, you’ll load those secrets into a Pod to prove the whole flow works.

**Why this course?** You’ll see the results at every step—Vault paths, ESO syncs, refresh intervals, and live Pods consuming secrets—so the workflow clicks through hands-on feedback.

Ready to turn scattered secrets into a centralized, rotated, auditable setup? Let’s dive in!