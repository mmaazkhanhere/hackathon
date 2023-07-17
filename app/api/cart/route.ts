import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/app/lib/drizzle";
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs";

export const POST = async (request: NextRequest) => {

    const req = await request.json();

    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.redirect('/sign-in')
        }

        const res = await db.insert(cartTable).values({
            product_name: req.product_name,
            quantity: req.quantity,
            user_id: userId
        }).returning();

        return NextResponse.json({ res });

    } catch (error) {
        console.error(error)
        throw new Error("Cannot insert the product in the database");
    }
};

export async function DELETE(req: NextRequest) {
    try {
        const { userId } = auth();

        if (userId !== null) {
            const productName = req.nextUrl.searchParams.get("product_name") as string;

            const res = await db
                .delete(cartTable)
                .where(eq(cartTable.product_name, productName))
                .execute();

            return NextResponse.json(res);
        }
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}
