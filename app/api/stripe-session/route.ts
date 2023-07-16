import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { urlForImage } from '@/sanity/lib/image'

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
    apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { cartItems, totalPrice } = body;
    try {
        if (cartItems.length > 0) {
            const session = await stripe.checkout.sessions.create({
                submit_type: "pay",
                mode: "payment",
                payment_method_types: ["card"],
                billing_address_collection: "auto",
                invoice_creation: {
                    enabled: true,
                },
                line_items: cartItems.map((item: any) => {
                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: item.name,
                                images: [urlForImage(item.image).url()]
                            },
                            unit_amount: item.oneQuantityPrice * 100
                        },
                        quantity: item.quantity,
                    };
                }),
                success_url: `${request.headers.get("origin")}/success`,
                cancel_url: `${request.headers.get("origin")}/?canceled=true`
            });
            return NextResponse.json({ session });
        } else {
            return NextResponse.json({ message: "No Data Found" });
        }
    } catch (err: any) {
        console.log(err);
        return NextResponse.json(err.message);
    }
}