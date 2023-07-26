import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/app/lib/drizzle";
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs";


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
            .where(eq(cartTable.product_name, productName))
            .limit(1); // Limit the query to 1 result

        if (existingCartItem.length > 0) {
            const newQuantity = existingCartItem[0].quantity + quantity;

            const updateResult = await db.update(cartTable)
                .set({ quantity: newQuantity })
                .where(eq(cartTable.product_name, productName))
                .execute();

            return NextResponse.json({ updateResult });
        } else {
            const insertResult = await db.insert(cartTable).values({
                product_name: req.product_name,
                quantity: req.quantity,
                price: req.price,
                user_id: userId
            }).returning().execute();
            console.log({ insertResult })
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

        const res = await db
            .delete(cartTable)
            .where(eq(cartTable.product_name, productName))
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

        const res = await db.update(cartTable)
            .set({ quantity: quantityReceived })
            .where(eq(cartTable.product_name, productName))
            .execute();

        return NextResponse.json(res);
    } catch (error) {
        throw new Error("Cannot update item quantity!");
    }
}
