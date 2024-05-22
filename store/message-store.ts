import { create } from "zustand";

type Sender = "user" | "model";

type Message = {
  sender: Sender;
  content: string[];
};
type MessageState = {
  messagesTask1: Message[];
  messagesTask2: Message[];
  messagesTask3: Message[];
};

type MessageAction = {
  addMessageTask1: (message: Message) => void;
  addMessageTask2: (message: Message) => void;
  addMessageTask3: (message: Message) => void;
};

export type MessageStore = MessageState & MessageAction;

export const useMessageStore = create<MessageStore>()((set) => ({
  messagesTask1: [],
  messagesTask2: [],
  messagesTask3: [],
  addMessageTask1: (message: Message) =>
    set((state: MessageStore) => ({
      messagesTask1: [...state.messagesTask1, message],
    })),
  addMessageTask2: (message: Message) =>
    set((state: MessageStore) => ({
      messagesTask2: [...state.messagesTask2, message],
    })),
  addMessageTask3: (message: Message) =>
    set((state: MessageStore) => ({
      messagesTask3: [...state.messagesTask3, message],
    })),
}));
