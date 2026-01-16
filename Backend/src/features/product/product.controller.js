import Product from '../../models/Product.js';

export default function productController() {
    const productList = async(req,res)=>{
        try{ 
            if (!req.user || !req.user.tenantId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized access"
                }); 
            }
            const products = await Product.aggregate([
            { $match: { tenantId: req.user.tenantId } },
            {
                $lookup: {
                from: "variants",
                localField: "_id",
                foreignField: "productId",
                as: "variants"
                }
            },
            {
                $project: {
                name: 1,
                category: 1,
                totalVariants: { $size: "$variants" }
                }
            }
            ]);
            return res.status(200).json({
            success: true,
            count: products.length,
            data: products
            });
        }
        catch(error)
        {
            res.status(500).json({success:false,message:error});
        }
    }
    return {productList}
}
