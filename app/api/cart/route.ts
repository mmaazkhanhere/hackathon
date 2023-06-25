import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/app/lib/drizzle";
import { eq } from "drizzle-orm"

import { v4 as uuid } from "uuid"
import { cookies } from "next/headers";
import { PgVarchar } from "drizzle-orm/pg-core";

export const GET = async (request: NextRequest) => {
    console.log("Get Response: ", request)
    try {
        const res = await db.select().from(cartTable)
        return NextResponse.json({ res })
    } catch (error) {
        console.log(error)
        throw new Error("Cannot GET the reponse")
    }
}

export const POST = async (request: NextRequest) => {

    console.log("POST Response: ", request)
    const req = await request.json();
    const uid = uuid();
    const setCookies = cookies();

    const user_id = cookies().get("user_id")
    if (!user_id) {
        setCookies.set("user_id", uid)
    }

    try {
        const res = await db.insert(cartTable).values({
            product_name: req.product_name,
            quantity: 1,
            user_id: cookies().get("user_id")?.value as string
        }).returning()
        return NextResponse.json({ res })
    } catch (error) {

    }
}

export const DELETE = async (request: NextRequest) => {

    console.log("Get DELETE: ", request)
    const user_id = cookies().get("user_id")?.value as string;

    if (!user_id) {
        throw new Error("user cannot be found");
    }

    try {
        const res = await db.delete(cartTable).where(eq(cartTable.user_id, user_id));
        return NextResponse.json(res);
    } catch (error) {
        throw new Error("Cannot delete the product");
    }
}
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
