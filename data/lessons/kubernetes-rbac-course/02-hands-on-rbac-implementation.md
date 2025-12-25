---
sectionIndex: 1
name: RBAC Implementation
metaDescription: Complete hands-on tutorial implementing Kubernetes RBAC security with service accounts, cluster roles, role bindings, and kube-rbac-proxy for API protection.
---

# RBAC Implementation

<lite-youtube videoid="hWj4y3Ok9Tg"></lite-youtube>

## Resources from **Video Description**

- **[GitHub Repository](https://github.com/rslim087a/k8s-rbac-starter)** - Starter code for the tutorial
- **Kube RBAC Proxy Image:** `gcr.io/kubebuilder/kube-rbac-proxy:v0.14.0`
- **[Kube RBAC Proxy Configuration Example](https://github.com/brancz/kube-rbac-proxy/blob/af1a90b60796a6d6acb3673bd58336e1a6319c2b/examples/rewrites/README.md?plain=1#L106)**
- **[Cluster Role Binding Example](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#clusterrolebinding-example)**
- **[Cluster Role Example](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#clusterrole-example)**

## Key Takeaways

**Multi-layered Security:** RBAC implementation requires securing both the client accessing your API and the proxy validating those requests. The client needs a service account with appropriate permissions, while the kube-rbac-proxy itself needs permissions to validate tokens against the Kubernetes API.

**Service Account Authentication:** Service accounts act as identity badges within Kubernetes. Clients use tokens extracted from service account secrets to authenticate, and the kube-rbac-proxy validates these tokens by creating TokenReview and SubjectAccessReview resources.

**Principle of Least Privilege:** Instead of granting cluster-admin access to everything, create custom cluster roles with only the specific permissions needed. For APIs, use non-resource URLs with appropriate HTTP verbs (GET, POST) rather than broad Kubernetes resource permissions.

**Token Extraction and Usage:** Extract base64-decoded tokens from service account secrets using `kubectl get secret -o jsonpath` and pass them in Authorization Bearer headers for API requests.

---

