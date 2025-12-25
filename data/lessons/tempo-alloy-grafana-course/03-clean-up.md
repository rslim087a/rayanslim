---
sectionIndex: 2
name: Clean Up
metaDescription: Clean up your Kubernetes environment by removing Tempo, Alloy, and Grafana resources after the distributed tracing tutorial.
---

# Clean Up

Time to clean up your Kubernetes environment to keep it tidy for future lessons.

## Delete All Namespaces

If you're following along with **Docker Desktop Kubernetes** (local development), run:

```bash
kubectl delete namespace --all
```

Note: Default namespaces like `kube-system`, `kube-node-lease`, etc. will be deleted momentarily but automatically recreate themselves.

## ⚠️ Important Warning

**DO NOT run these commands** if you're working in:
- A shared/sandbox cluster
- A production cluster  
- Any cluster with important workloads

These commands will delete entire namespaces including the distributed tracing stack. Only use on your local development cluster.

## Verify Clean State

Check that the namespaces are gone:

```bash
kubectl get namespaces
```

Your cluster is now clean and ready for the next lesson!