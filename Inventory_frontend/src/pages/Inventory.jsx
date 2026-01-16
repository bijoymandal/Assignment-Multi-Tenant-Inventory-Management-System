import { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";
import CommonTable from "../components/CommonTable";
import DashboardLayout from "../components/layouts/DashboardLayout";

export default function Inventory() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        apiFetch("/products")
            .then(res => {
                // If API returns { success, data }
                const products = res.data || res;
                console.log(products);

                // Map backend data to UI format
                const formatted = products.map(p => ({
                    _id: p._id,
                    sku: p.name,               // or p.sku if exists
                    attributes: {
                        color: p.color || "N/A",
                        size: p.size || "N/A"
                    },
                    stock: p.stock || 0,
                    price: p.price || 0
                }));

                setItems(formatted);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const columns = [
        { key: "sku", label: "SKU" },
        { key: "color", label: "Color" },
        { key: "size", label: "Size" },
        { key: "stock", label: "Stock" },
        { key: "price", label: "Price" }
    ];

    return (
        <DashboardLayout>
            <CommonTable
                title="Inventory"
                columns={columns}
                data={items}
                loading={loading}
                error={error}
                renderRow={(v) => (
                    <tr key={v._id} className="border-t">
                        <td className="p-2">{v.sku}</td>
                        <td>{v.attributes.color}</td>
                        <td>{v.attributes.size}</td>
                        <td className={v.stock < 20 ? "text-red-600" : ""}>
                            {v.stock}
                        </td>
                        <td>₹{v.price}</td>
                    </tr>
                )}
            />
        </DashboardLayout>
    );
}
