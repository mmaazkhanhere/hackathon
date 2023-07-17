import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
    matcher: ["/cart", "/api/cart/POST", '/success', "/api/stripe-session"],
};
