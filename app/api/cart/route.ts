import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/app/lib/drizzle";
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs";
import { PgColumn } from "drizzle-orm/pg-core";

// export const POST = async (request: NextRequest) => {

//     const req = await request.json();

//     try {
//         const { userId } = auth();
//         if (!userId) {
//             return NextResponse.redirect('/sign-in')
//         }

//         const res = await db.insert(cartTable).values({
//             product_name: req.product_name,
//             quantity: req.quantity,
//             user_id: userId
//         }).returning();

//         return NextResponse.json({ res });

//     } catch (error) {
//         console.error(error)
//         throw new Error("Cannot insert the product in the database");
//     }
// };

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

        const res = await db
            .delete(cartTable)
            .where(eq(cartTable.product_name, productName))
            .execute();

        return NextResponse.json(res);

    } catch (error) {
        console.error('Error deleting item:', error);
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const productName = req.nextUrl.searchParams.get("product_name") as string;
        const itemQuantity = await db.select({ quantity: cartTable.quantity }).from(cartTable).where(eq(cartTable.product_name, productName));

        if (itemQuantity) {
            const newQuantity = itemQuantity[0].quantity + 1;

            const res = await db.update(cartTable).set({ quantity: newQuantity })
                .where(eq(cartTable.product_name, productName)).execute();

            return NextResponse.json(res)
        }
    } catch (error) {
        throw new Error("Cannot update item quantity!")
    }
}