import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
    matcher: ["/cart", "/api/cart", "/api/cart/:id*", "/api/stripe-session"],
};
