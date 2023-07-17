import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/app/lib/drizzle";
import { eq } from "drizzle-orm"


import { auth } from "@clerk/nextjs";

export const GET = async (request: NextRequest) => {

    try {
        const items = await db.select().from(cartTable).execute();
        return NextResponse.json({ items })
    } catch (error) {
        console.log(error)
        throw new Error("Cannot GET the reponse")
    }
}

export const POST = async (request: NextRequest) => {

    console.log(request)
    console.log(request.json())
    console.log(request.body)

    const req = await request.json();

    console.log(req)
    console.log(req.body)

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

export const DELETE = async (request: NextRequest) => {
    console.log("Get DELETE: ", request.body);

    const req = await request.json();

    try {
        const res = await db
            .delete(cartTable)
            .where(eq(cartTable.product_name, req.product_name));

        // Return the deleted item or appropriate status code
        return NextResponse.json({ res });
    } catch (error) {
        console.error("Error deleting the product:", error);
        throw new Error("Cannot delete the product");
    }
};
    // const url = req.nextUrl;
    // let user_id;
    // if (!url.searchParams.has("user_id")) {
    //     user_id = cookies().get("user_id")?.value as string;
    //     if (!user_id) {
    //         return NextResponse.json({ "error": "user_id not provided" });
    //     }
    // } else {
    //     user_id = url.searchParams.get("user_id") as string;
    //     const res = await db.delete(cartTable).where(eq(cartTable.user_id, user_id)).returning();
    //     return NextResponse.json(res);
    // }
//}
