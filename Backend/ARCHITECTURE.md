## Tenant Isolation Strategy

We use **Row-Level Isolation** with a shared MongoDB database.

Each record includes a `tenantId` field to ensure strict data separation.

### Why Row-Level Isolation?

| Option | Pros | Cons |
|--------|------|------|
| Separate DB per tenant | Strong isolation | High cost, complex scaling |
| Separate schema | Medium isolation | Hard to manage |
| Row-level (Chosen) | Scalable, simple, cost-effective | Requires strict filtering |

### Example:

{
  tenantId: ObjectId,
  name: "T-Shirt",
  stock: 120
}

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

##  Data Modeling Decisions
Products and variants are stored in separate collections.

    Product modal 
    { _id, tenantId, name, category }

    Variant(SKU)
    {
        _id,
        tenantId,
        productId,
        sku,
        attributes: { color, size },
        stock,
        price
    }

## Why Separate Variants?
    upports thousands of combinations
    Easy stock management
    Faster queries
    SKU tracks its own stock 

## Concurrency Handling

    Problem:
    Two users try to order the last item at the same time.

    Solution:
    MongoDB Transactions + Atomic Updates

## example
    Variant.findOneAndUpdate(
        { _id, stock: { $gte: qty } },
        { $inc: { stock: -qty } }
    )
##  Order Processing Rules
    Draft → Confirmed → Partially Fulfilled → Fulfilled → Cancelled
## Suppliers & Purchase Orders
    Each supplier has SKU-based pricing:
    { variantId, cost }

    Purchase Order Model
    {
        tenantId,
        supplierId,
        status: "Draft" | "Sent" | "Confirmed" | "Received",
        items: [{ variantId, orderedQty, receivedQty, orderedPrice, receivedPrice }]
        }

    Features

    Multiple items per PO
    Partial deliveries
    Price variance tracking
    Auto stock update on receipt

## Performance Optimization
    Indexing.   Fast lookups
    Pagination   Small payload
    Aggregation.  server side rendering
    Lean queries   Low memory usages
    Caching.       First show record (Billons of Records)

## Scalability Considerations
    Indexed tenant queries
    Horizontal scaling ready
    MongoDB supports large datasets

