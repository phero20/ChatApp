import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const create = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    if (args.email === identity.email) {
      throw new ConvexError("You cannot send request to yourself");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      throw new ConvexError("Current user not found");
    }

    const reciever = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!reciever) {
      throw new ConvexError("Reciever not found");
    }

    const requestAlreadySend = await ctx.db
      .query("requests")
      .withIndex("by_receiver_sender", (q) =>
        q.eq("receiver", reciever._id).eq("sender", currentUser._id)
      )
      .unique();
    if (requestAlreadySend) {
      throw new ConvexError("Request already sent");
    }

    const requestAlreadyRecieved = await ctx.db
      .query("requests")
      .withIndex("by_receiver_sender", (q) =>
        q.eq("receiver", currentUser._id).eq("sender", reciever._id)
      )
      .unique();
    if (requestAlreadyRecieved) {
      throw new ConvexError("User has already sent you a request");
    }

    const request = await ctx.db.insert("requests", {
      sender: currentUser._id,
      receiver: reciever._id,
    });

    return request;
  },
});
