import { Message } from "./../node_modules/svix/src/api/message";
import { Webhook } from "./../node_modules/svix/src/webhook";
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "lucide-react";
import { WebhookEvent } from "@clerk/nextjs/server";
import {internal} from "./_generated/api"

const http = httpRouter();

const validatePayload = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };
  const Webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  try {
    const event = Webhook.verify(payload, svixHeaders) as WebhookEvent;
    return event;
  } catch (error) {
    console.error("clerk webhook error");
    return;
  }
};

const handleClerkWebHook = httpAction(async (ctx,req)=>{
    const event = await validatePayload(req);
    if(!event) return new Response("Invalid payload", {status:400});

    switch(event.type){
        case "user.created":
            const user = await ctx.runQuery(internal.user.get,{clerkId:event.data.id});
            if(user){
                console.log(`upading user ${event.data.id} with ${event.data} `);
            }
        case "user.updated":
            console.log('creating updating user',event.data.id);
            await ctx.runMutation(internal.user.create,{
                clerkId:event.data.id,
                email:event.data.email_addresses[0].email_address,
                imageUrl:event.data.image_url,
                username:`${event.data.first_name} ${event.data.last_name}`
            })
            break;

})

const handleClerkWebhook = httpAction(async (convexToJson, req) => {
  const event = await validatePayload(req);
});

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http;
