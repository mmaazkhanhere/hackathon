import { NextRequest, NextResponse } from 'next/server'
import { db, cartTable } from '@/app/lib/drizzle'

import { v4 as uuid } from "uuid"
import { cookies } from "next/headers"

export const GET = async (request: NextRequest) => {
    try {
        const res = await db.select().from(cartTable)
        return NextResponse.json({ res })
    } catch (error) {
        throw new Error("Something went wrong")
        return NextResponse.json({ message: "Operation failed" })
    }
}

export const POST = async (request: NextRequest) => {
    const req = await request.json();
    const uid = uuid();
    const setCookies = cookies();

    const user_id = cookies().get("user_id")?.value


    try {
        const res = await db.insert(cartTable).values({
            product_name: req.product_name,
            quantity: 1,
            user_id: user_id as string
        }).returning();
        return NextResponse.json({ res })

    } catch (error) {
        throw new Error("Adding item into database failed!")
    }
}