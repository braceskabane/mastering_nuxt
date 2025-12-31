import { PrismaClient } from "@prisma/client";
import protectRoute from "~/server/utils/protectRoute";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Protect the route - requires authenticated user
  await protectRoute(event);

  const userEmail = event.context.user?.email;

  if (!userEmail) {
    throw createError({
      statusCode: 400,
      statusMessage: "User email not found",
    });
  }

  try {
    // Get courseId from query params
    const query = getQuery(event);
    const courseId = query.courseId ? parseInt(query.courseId as string) : 1;

    // Check if user has a verified purchase for this course
    const purchase = await prisma.coursePurchase.findFirst({
      where: {
        userEmail,
        courseId,
        verified: true,
      },
    });

    return {
      hasAccess: !!purchase,
      message: purchase ? "User has access to this course" : "User does not have access",
    };
  } catch (error) {
    console.error("hasAccess error:", error);
    throw createError({
      statusCode: 500,
      statusMessage:
        error instanceof Error ? error.message : "Failed to check access",
    });
  }
});
