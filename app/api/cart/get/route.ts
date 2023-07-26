import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/app/lib/drizzle";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs";

export const GET = async (request: NextRequest) => {
    try {
        const { userId } = auth();

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