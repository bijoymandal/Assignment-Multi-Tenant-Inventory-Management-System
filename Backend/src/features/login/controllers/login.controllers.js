import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../models/User.js";

export default function loginController() {
    const userLogin = async (req,res) => {
        const { email, password } = req.body;
        try{
            if (!email || !password) {
               return res.status(400).json({ message: "All fields required" });
            }
            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ message: "Invalid login" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid login" });

            const token = jwt.sign(
            {
                id: user._id,
                tenantId: user.tenantId,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
            );

            return res.status(200).json({ token, user:{id:user._id,name:user.name,role:user.role,email:user.email} });
        }
        catch(error)
        {
            return res.status(500).json(error);
        }
    } 
    return {userLogin}
}