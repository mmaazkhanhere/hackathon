import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
    matcher: ["/cart", "/api/cart/:id*", '/success', "/api/stripe-session"],
};
