import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../models/User.js";

export default function loginController() {
    const userLogin = async (req,res) => {
        const { email, password } = req.body;
        try{
            const user = await User.findOne({ email });
            if (!user) return res.status(401).json({ message: "Invalid login" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid login" });

            const token = jwt.sign(
            {
                userId: user._id,
                tenantId: user.tenantId,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
            );

            return res.status(200).json({ token, role: user.role });
        }
        catch(error)
        {
            return res.status(500).json(error);
        }
    } 
    return {userLogin}
}