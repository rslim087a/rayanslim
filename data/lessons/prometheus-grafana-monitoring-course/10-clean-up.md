---
sectionIndex: 10
name: Final Clean Up
metaDescription: Clean up your Kubernetes environment by Redis monitoring resources, exporters, and namespaces after the monitoring tutorial.
---

# Final Clean Up

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

These commands will delete entire namespaces including Redis instances and monitoring resources. Only use on your local development cluster.

## Verify Clean State

Check that namespaces are clean:

```bash
kubectl get namespaces
```

Your cluster is now clean and ready for the next lesson!