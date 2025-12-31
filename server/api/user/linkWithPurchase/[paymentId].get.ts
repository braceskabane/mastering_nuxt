import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const paymentId = getRouterParam(event, "paymentId");
  const user = event.context.user;

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  if (!paymentId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Payment ID is required",
    });
  }

  try {
    // Link the purchase to the authenticated user's email
    await prisma.coursePurchase.updateMany({
      where: {
        paymentId,
      },
      data: {
        userEmail: user.email,
      },
    });

    return { success: true, message: "Purchase linked successfully" };
  } catch (error) {
    console.error("Error linking purchase to user:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error linking purchase to user",
    });
  }
});
