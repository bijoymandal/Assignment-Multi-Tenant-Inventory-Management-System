## Tenant Isolation Strategy

We use **Row-Level Isolation** with a shared MongoDB database.

Each record includes a `tenantId` field to ensure strict data separation.

### Why Row-Level Isolation?

| Option | Pros | Cons |
|--------|------|------|
| Separate DB per tenant | Strong isolation | High cost, complex scaling |
| Separate schema | Medium isolation | Hard to manage |
| Row-level (Chosen) | Scalable, simple, cost-effective | Requires strict filtering |

### Enforcement

- Each user belongs to one tenant
- JWT includes tenantId & role
- All API queries are filtered by tenantId
- Middleware blocks unauthorized access

### Security

- JWT-based authentication
- Role-based access (Owner / Manager / Staff)
- No cross-tenant queries allowed

This approach ensures:
- Data isolation
- Scalability
- SaaS 
