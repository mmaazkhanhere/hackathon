import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/app/lib/drizzle";
import { and, eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs";

export const GET = async (request: NextRequest) => {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId");
        if (!userId) {
            throw new Error("User ID not provided");
        }

        const items = await db
            .select()
            .from(cartTable)
            .where(eq(cartTable.user_id, userId))
            .execute();

        const response = NextResponse.json({ items });
        response.headers.set("Cache-Control", "no-store, immutable");

        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Cannot GET the response");
    }
};



export const POST = async (request: NextRequest) => {
    const req = await request.json();

    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.redirect('/sign-in');
        }

        const productName = req.product_name;
        const quantity = req.quantity;

        const existingCartItem = await db.select({ quantity: cartTable.quantity })
            .from(cartTable)
            .where(and(eq(cartTable.product_name, productName), eq(cartTable.user_id, userId)))
            .limit(1); // Limit the query to 1 result

        if (existingCartItem.length > 0) {
            const newQuantity = existingCartItem[0].quantity + quantity;

            const updateResult = await db.update(cartTable)
                .set({ quantity: newQuantity })
                .where(and(eq(cartTable.product_name, productName), eq(cartTable.user_id, userId)))
                .execute();

            return NextResponse.json({ updateResult });
        } else {
            const insertResult = await db.insert(cartTable).values({
                product_name: req.product_name,
                quantity: req.quantity,
                price: req.price,
                user_id: userId
            }).returning().execute();
            return NextResponse.json({ insertResult });
        }
    } catch (error) {
        console.error(error);
        throw new Error("Cannot insert/update the product in the database");
    }
};



export async function DELETE(req: NextRequest) {
    try {
        const productName = req.nextUrl.searchParams.get("product_name") as string;

        const { userId } = auth();
        if (!userId) {
            return NextResponse.redirect('/sign-in');
        }

        const res = await db
            .delete(cartTable)
            .where(and(eq(cartTable.product_name, productName), eq(cartTable.user_id, userId)))
            .execute();

        const response = NextResponse.json(res);
        response.headers.set('Cache-Control', 'no-store, immutable');

        return response;

    } catch (error) {
        console.error('Error deleting item:', error);
    }
}


export async function PATCH(req: NextRequest) {
    try {
        const requestBody = await req.json();
        const productName = req.nextUrl.searchParams.get("product_name") as string;
        const quantityReceived = requestBody.quantity;
        const { userId } = auth();
        if (!userId) {
            return NextResponse.redirect('/sign-in');
        }

        const cartItem = await db.select()
            .from(cartTable)
            .where(and(eq(cartTable.product_name, productName), eq(cartTable.user_id, userId)))
            .execute();

        if (!cartItem || cartItem.length === 0) {
            return new NextResponse("Cart item not found.", { status: 404 });
        }

        await db.update(cartTable)
            .set({ quantity: quantityReceived })
            .where(and(eq(cartTable.product_name, productName), eq(cartTable.user_id, userId)))
            .execute();

        const updatedCartItem = await db.select()
            .from(cartTable)
            .where(and(eq(cartTable.product_name, productName), eq(cartTable.user_id, userId)))
            .execute();

        // Return the updated cart item in the response
        return NextResponse.json(updatedCartItem[0]);
    } catch (error) {
        console.error(error);
        return new NextResponse("Cannot update item quantity.", { status: 500 });
    }
}


