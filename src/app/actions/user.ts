"use server";

import { db } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getUserStats() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { borrowedCount: 0, waitlistCount: 0, borrowedItems: [], waitlistItems: [] };
  }

  const userId = session.user.id;
  console.log("Fetching stats for user:", userId);

  try {
    const borrowedItems = await db.collection("borrows")
      .find({ userId, status: "borrowed" })
      .sort({ borrowedAt: -1 })
      .limit(5)
      .toArray();
      
    const waitlistItems = await db.collection("waitlists")
      .find({ userId })
      .sort({ joinedAt: -1 })
      .limit(5)
      .toArray();

    const borrowedCount = await db.collection("borrows").countDocuments({ 
      userId, 
      status: "borrowed" 
    });
    
    const waitlistCount = await db.collection("waitlists").countDocuments({ 
      userId 
    });

    console.log("Stats found:", { borrowedCount, waitlistCount });

    return { 
      borrowedCount, 
      waitlistCount,
      borrowedItems: JSON.parse(JSON.stringify(borrowedItems)),
      waitlistItems: JSON.parse(JSON.stringify(waitlistItems))
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return { borrowedCount: 0, waitlistCount: 0, borrowedItems: [], waitlistItems: [] };
  }
}

export async function borrowBook(bookId: string, bookTitle: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("You must be logged in to borrow a book");
  }

  const userId = session.user.id;

  try {
    // Record the borrow
    await db.collection("borrows").insertOne({
      userId,
      bookId,
      bookTitle,
      status: "borrowed",
      borrowedAt: new Date(),
    });

    revalidatePath("/my-profile");
    return { success: true };
  } catch (error) {
    console.error("Error borrowing book:", error);
    throw new Error("Failed to borrow book");
  }
}

export async function addToWaitlist(bookId: string, bookTitle: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("You must be logged in to join waitlist");
  }

  const userId = session.user.id;

  try {
    await db.collection("waitlists").insertOne({
      userId,
      bookId,
      bookTitle,
      joinedAt: new Date(),
    });

    revalidatePath("/my-profile");
    return { success: true };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    throw new Error("Failed to add to waitlist");
  }
}
