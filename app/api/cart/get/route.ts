import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/app/lib/drizzle";

export const GET = async (request: NextRequest) => {
    try {
        const items = await db.select().from(cartTable).execute();
        return NextResponse.json({ items })
    } catch (error) {
        console.log(error)
        throw new Error("Cannot GET the reponse")
    }
}