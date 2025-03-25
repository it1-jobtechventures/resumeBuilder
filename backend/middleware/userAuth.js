// import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//     const {token} = req.cookies;

//     if(!token) {
//         return res.json({status:false, message: "Not authorised. Login again"})
//     }

//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//         if(tokenDecode.id) {
//             req.body.userId = tokenDecode.id
//         } else {
//             return res.json({
//                 success: false,
//                 message: 'Not Authorised. Login Again'
//             });
//         }

//         next();
//     } catch (error) {
//         res.json({success: false, message: error.message})
//     }
// }

// export default userAuth;

import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ status: false, message: "Not authorized. Login again" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode && tokenDecode.id) {
            req.user = { id: tokenDecode.id }; // Attach user data to req
            next();
        } else {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid Token: " + error.message });
    }
};

export default userAuth;
