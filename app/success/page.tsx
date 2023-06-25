import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import { cartTable, db } from "../lib/drizzle";
import { eq } from "drizzle-orm"

const deleteItems = async (user_id: string) => {
    try {
        const res = await db.delete(cartTable).where(eq(cartTable.user_id, user_id));
        console.log("Items deleted successfully")
    } catch {
        throw new Error("cannot delete the cart items from the database")
    }
}


export default async function success() {

    const user_id = cookies().get("user_id")?.value as string;
    deleteItems(user_id);

    return (
        <div className="min-h-[650px] flex items-center">
            <section className="max-w-[1400px] mx-auto">
                <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col">
                    <div className="text-2xl font-bold font-arimo">
                        Thank you for shopping with us!
                    </div>
                    <div className="text-base mt-5 font-inconsolata">
                        For any product related query, drop an email to
                    </div>
                    <Link
                        href="mailto:contact@samstorellc.com"
                        className="underline cursor-pointer hover:font-bold font-inconsolata"
                    >
                        contact@dine-ecommerce.com
                    </Link>

                    <Link href="/" className="font-bold mt-5 font-inconsolata">
                        Continue Shopping
                    </Link>
                </div>
            </section>
        </div>
    );
}