---
sectionIndex: 1
name: External Secrets Implementation
metaDescription: Complete hands-on implementation centralizing secrets in HashiCorp Vault KV storage and syncing them to Kubernetes using External Secrets Operator for production applications.
---

# External Secrets Implementation

<lite-youtube videoid="CF6ARIXdA4A"></lite-youtube>

## Resources from **Video Description**

* **[GitHub Repository](https://github.com/rslim087a/vault-kubernetes-external-secrets-tutorial)** – All project files to follow along (Vault + ESO)

## Key Takeaways

* Use **HashiCorp Vault (KV v2)** as the central, encrypted source of truth; never store secrets in Git.
* Install **External Secrets Operator (ESO)** via Helm to sync Vault → Kubernetes.
* Configure a **ClusterSecretStore** (Vault URL, KV path, token Secret) to authenticate and read from Vault.
* Define **ExternalSecret** objects to map Vault paths/keys (and optional **version**) into Kubernetes **Secrets**.
* Enable **refreshInterval** for automatic rotation so K8s Secrets stay aligned with Vault updates.
* Verify by consuming the generated Secret in a **Pod** (env or volume) and checking logs.

You now have a secure, auditable, and refreshable secrets workflow—ready for real apps and real environments.
