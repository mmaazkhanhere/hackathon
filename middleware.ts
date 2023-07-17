import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/api/cart/get', '/api/cart/delete'],
});

export const config = {
    matcher: ['/cart', '/success', '/api/cart', '/api/stripe-session']
}
