---
sectionIndex: 1
name: Keycloak SSO Implementation
metaDescription: Complete hands-on tutorial implementing Keycloak single sign-on with OpenID Connect, Grafana integration, authentication realms, and user role mapping configuration.
---

# Keycloak SSO Implementation

<lite-youtube videoid="-DQCiaOSlqs"></lite-youtube>

## Resources from **Video Description**

- **[GitHub Repository](https://github.com/rslim087a/keycloak-sso-kubernetes-oidc-tutorial)** - Complete configuration files and setup

## Key Takeaways

**OpenID Connect vs OAuth:** While OAuth simply grants access tokens to use applications, **OpenID Connect extends OAuth** by also providing identity tokens that tell applications who the user is and what roles they should have. This enables applications to not just authorize users but know exactly their identity and permissions.

**Two-Token System:** Keycloak issues both an **access token** (authorizes user to access the application) and an **ID token** (contains user identity and role information). Applications use the access token for authorization and decode the ID token to determine what permissions to grant within their own system.

**Client-Realm Architecture:** In Keycloak, applications are **clients** (like Grafana) that belong to a **realm** (authentication space). Each client has a secret to prove authenticity, and users in the realm can sign into clients based on their credentials and assigned roles.

**Automatic Role Mapping:** Through **client scopes** and **mappers**, Keycloak automatically includes user roles in tokens. Applications can then map these Keycloak roles to their own internal roles (e.g., Keycloak "admin" role → Grafana admin permissions) without manual configuration for each user.

---

