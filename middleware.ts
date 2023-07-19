import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: ['/api/cart/get'],
});

export const config = {
    matcher: ['/cart', '/success', '/api/cart', '/api/stripe-session']
}
