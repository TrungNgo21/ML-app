"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Aperture, FileImage, Zap } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  submitTask1,
  submitTask2,
  submitTask3,
} from "@/actions/handle-image-upload";
import { useMessageStore } from "@/store/message-store";
import MessageItem from "@/app/playground/components/message-item";

export default function PlaygroundPage() {
  const [isPending, startTransition] = useTransition();
  const [isPending2, startTransition2] = useTransition();
  const [isPending3, startTransition3] = useTransition();
  const [selectedImage1, setSelectedImage1] = useState("");
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [selectedFile3, setSelectedFile3] = useState<File | null>(null);

  const [selectedImage2, setSelectedImage2] = useState("");
  const [selectedImage3, setSelectedImage3] = useState("");
  const messageStore = useMessageStore();

  const handleImageChange1 = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile1(e.target.files[0]);
      setSelectedImage1(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleImageChange2 = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile2(e.target.files[0]);
      setSelectedImage2(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleImageChange3 = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile3(e.target.files[0]);
      setSelectedImage3(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit1 = (e: any) => {
    e.preventDefault();
    messageStore.addMessageTask1({
      sender: "user",
      content: [selectedImage1],
    });
    startTransition(async () => {
      setSelectedImage1("");
      setSelectedFile1(null);
      const response = await submitTask1(
        selectedFile1 ? selectedFile1 : new File([], "empty"),
      );
      messageStore.addMessageTask1({
        sender: "model",
        content: [response],
      });
    });
  };

  const handleSubmit2 = (e: any) => {
    e.preventDefault();
    messageStore.addMessageTask2({
      sender: "user",
      content: [selectedImage2],
    });
    startTransition2(async () => {
      setSelectedImage2("");
      setSelectedFile2(null);
      const response = await submitTask2(
        selectedFile2 ? selectedFile2 : new File([], "empty"),
      );
      console.log(response);
      messageStore.addMessageTask2({
        sender: "model",
        content: response.recommendations,
      });
    });
  };

  const handleSubmit3 = (e: any) => {
    e.preventDefault();
    messageStore.addMessageTask3({
      sender: "user",
      content: [selectedImage3],
    });
    startTransition3(async () => {
      setSelectedImage3("");
      setSelectedFile3(null);
      const response = await submitTask3(
        selectedFile3 ? selectedFile3 : new File([], "empty"),
      );
      console.log(response);
      messageStore.addMessageTask3({
        sender: "model",
        content: response.recommendations,
      });
    });
  };

  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className=" container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Playground</h2>
        </div>
        <Separator />
        <Tabs defaultValue="task1" className="flex-1">
          <div className="container h-full py-6">
            <div className="flex gap-x-6">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Task
                  </span>
                  <TabsList className="flex items-center">
                    <TabsTrigger value="task1">
                      <span className="">Task 1</span>
                    </TabsTrigger>
                    <TabsTrigger value="task2">
                      <span className="">Task 2</span>
                    </TabsTrigger>
                    <TabsTrigger value="task3">
                      <span className="">Task 3</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              <div className="md:order-1 flex-1">
                <TabsContent value="task1" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <ScrollArea className="gap-y-4 rounded p-2 ring ring-accent h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] flex flex-col items-center">
                      <div className="flex px-3 py-2 rounded-full place-items-center gap-2 bg-muted mb-2">
                        <Aperture />
                        Predict your furniture image with out model
                      </div>
                      <div>
                        {messageStore.messagesTask1.map((message) => (
                          <MessageItem
                            sender={message.sender}
                            message={message.content}
                            key={message.content[0]}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <Label
                          className="gap-x-2 px-2 py-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
                          htmlFor="upload-img"
                        >
                          <FileImage />
                          Upload image
                        </Label>
                        <Input
                          id="upload-img"
                          type="file"
                          className="hidden"
                          disabled={isPending}
                          onChange={handleImageChange1}
                        />
                        {selectedImage1 && (
                          <div
                            style={{
                              marginTop: "10px",
                              position: "relative",
                              width: "200px",
                              height: "200px",
                            }}
                          >
                            <Image
                              src={selectedImage1}
                              alt="Selected"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                        )}{" "}
                      </div>
                      <form onSubmit={handleSubmit1}>
                        <Button
                          type="submit"
                          className="flex items-center gap-x-2"
                          disabled={isPending || !selectedFile1}
                        >
                          <Zap /> Submit Image
                        </Button>
                      </form>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="task2" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <ScrollArea className="gap-y-4 rounded p-2 ring ring-accent h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] flex flex-col items-center">
                      <div className="flex px-3 py-2 rounded-full place-items-center gap-2 bg-muted mb-2">
                        <Aperture />
                        Recommendation 10 similar images for you image
                      </div>
                      <div>
                        {messageStore.messagesTask2.map((message) => (
                          <MessageItem
                            message={message.content}
                            sender={message.sender}
                            key={message.content[0]}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <Label
                          className="gap-x-2 px-2 py-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
                          htmlFor="upload-img"
                        >
                          <FileImage />
                          Upload image
                        </Label>
                        <Input
                          id="upload-img"
                          type="file"
                          className="hidden"
                          disabled={isPending2}
                          onChange={handleImageChange2}
                        />
                        {selectedImage2 && (
                          <div
                            style={{
                              marginTop: "10px",
                              position: "relative",
                              width: "200px",
                              height: "200px",
                            }}
                          >
                            <Image
                              src={selectedImage2}
                              alt="Selected"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                        )}{" "}
                      </div>
                      <form onSubmit={handleSubmit2}>
                        <Button
                          type="submit"
                          className="flex items-center gap-x-2"
                          disabled={isPending2 || !selectedFile2}
                        >
                          <Zap /> Submit Image
                        </Button>
                      </form>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="task3" className="mt-0 border-0 p-0">
                  <div className="flex flex-col space-y-4">
                    <ScrollArea className="gap-y-4 rounded p-2 ring ring-accent h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] flex flex-col items-center">
                      <div className="flex px-3 py-2 rounded-full place-items-center gap-2 bg-muted mb-2">
                        <Aperture />
                        Recommendation 10 similar images for you image style
                      </div>
                      <div>
                        {messageStore.messagesTask3.map((message) => (
                          <MessageItem
                            message={message.content}
                            sender={message.sender}
                            key={message.content[0]}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <Label
                          className="gap-x-2 px-2 py-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90"
                          htmlFor="upload-img"
                        >
                          <FileImage />
                          Upload image
                        </Label>
                        <Input
                          id="upload-img"
                          type="file"
                          className="hidden"
                          disabled={isPending3}
                          onChange={handleImageChange3}
                        />
                        {selectedImage3 && (
                          <div
                            style={{
                              marginTop: "10px",
                              position: "relative",
                              width: "200px",
                              height: "200px",
                            }}
                          >
                            <Image
                              src={selectedImage3}
                              alt="Selected"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                        )}{" "}
                      </div>
                      <form onSubmit={handleSubmit3}>
                        <Button
                          type="submit"
                          className="flex items-center gap-x-2"
                          disabled={isPending3 || !selectedFile3}
                        >
                          <Zap /> Submit Image
                        </Button>
                      </form>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
