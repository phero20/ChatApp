"use client";

import ItemList from "@/components/shared/item-list/ItemList";
import { api } from "@/convex/_generated/api";
import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  useQuery,
} from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";
import DMConversionItem from "./_components/DMConversionItem";
import CreateGroupDialog from "./_components/CreateGroupDialog";
import GroupConversationItem from "./_components/GroupConversationItem";
import { SignInButton } from "@clerk/nextjs";
import LoadingLogo from "@/components/shared/LoadingLogo";
import { Button } from "@/components/ui/button";


const ConversationsLayout = ({ children }: React.PropsWithChildren) => {
  const conversations = useQuery(api.conversations.get);
  const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
</svg>

);
  return (
    <>
      <AuthLoading>
        <LoadingLogo />
      </AuthLoading>
      <Unauthenticated>
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
              <div className="flex flex-col text-primary items-center mb-6 font-bold text-4xl gap-12">
              <h1>Chat App</h1>
              <img src="/logo.svg" alt="" className="animate-pulse w-20" />
              </div>
                <h1 className="text-3xl font-bold tracking-tight mb-2 text-primary">
                    Get Started
                </h1>
                <p className="text-muted-foreground mb-6">
                    Sign in with your Google account to access all features.
                </p>
                <div className="w-full max-w-xs">
                    <SignInButton mode="modal">
                        <Button className="w-full shadow-sm">
                            <GoogleIcon />
                            Sign in with Google
                        </Button>
                    </SignInButton>
                </div>
            </div>
        </Unauthenticated>
      <Authenticated>
        <ItemList title="Conversations" action={<CreateGroupDialog />}>
          {conversations ? (
            conversations.length === 0 ? (
              <p className="w-full h-full flex items-center justify-center">
                No conversations Found
              </p>
            ) : (
              conversations.map((conversations, index) => {
                return conversations.conversation.isGroup ? (
                  <GroupConversationItem
                    key={conversations.conversation._id}
                    id={conversations.conversation._id}
                    name={conversations.conversation.name || ""}
                    lastMessageContent={conversations.lastMessage?.content}
                    lastMessageSender={conversations.lastMessage?.sender}
                    unseenCount={conversations.unseenCount}
                  />
                ) : (
                  <DMConversionItem
                    key={conversations.conversation._id}
                    id={conversations.conversation._id}
                    username={conversations.otherMember?.username || ""}
                    imageUrl={conversations.otherMember?.imageUrl || ""}
                    lastMessageContent={conversations.lastMessage?.content}
                    lastMessageSender={conversations.lastMessage?.sender}
                    unseenCount={conversations.unseenCount}
                  />
                );
              })
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
        </ItemList>
        {children}
      </Authenticated>
    </>
  );
};

export default ConversationsLayout;
