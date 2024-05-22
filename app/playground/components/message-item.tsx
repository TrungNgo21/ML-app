"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const prefix =
  "https://a02e-2405-4803-c687-7f00-70c9-ff89-df9b-34d8.ngrok-free.app";
export default function MessageItem({
  message,
  sender,
}: {
  message: string[];
  sender: string;
}) {
  const listImg = message;
  return (
    <div
      className={`${sender === "model" ? "flex-row justify-start" : "flex-row-reverse"} flex items-end flex-wrap gap-x-4 my-4 gap-y-2`}
    >
      {sender === "user" ? (
        <Avatar>
          <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
          <AvatarFallback>Hi</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar>
          <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      )}
      {listImg.length > 1 ? (
        listImg.map((message1) => (
          <div
            key={message1.toString()}
            className="p-3 rounded-md rounded-br-none border border-border bg-muted"
          >
            <img
              src={prefix + "/" + message1}
              alt="image"
              width={100}
              height={100}
            />
          </div>
        ))
      ) : (
        <div className="p-3 rounded-md rounded-br-none border border-border bg-muted">
          {message[0]!.includes("http") ? (
            <Image
              src={message[0] ? message[0] : ""}
              alt="image"
              width={300}
              height={300}
            />
          ) : (
            <p>{message[0]}</p>
          )}
        </div>
      )}
    </div>
  );
}
