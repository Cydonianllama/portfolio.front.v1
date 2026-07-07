import TextareaAutosize from "react-textarea-autosize";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export type HandleToSendMessageProp = {
  message: string;
};

export type TextAreaChatProps = {
  HandleToSendMessage: (data: HandleToSendMessageProp) => void;
  sending: boolean;
  resetSignal: number;
};

export const TextAreaChat = ({
  HandleToSendMessage,
  sending,
  resetSignal,
}: TextAreaChatProps) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
  }, [resetSignal]);

  return (
    <InputGroup className="h-full">
      <TextareaAutosize
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        data-slot="input-group-control"
        className="flex min-h-24 max-h-50 field-sizing-content h-full w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
        placeholder="Escribe el mensaje..."
      />
      <InputGroupAddon align="block-end">
        <InputGroupButton
          onClick={() => HandleToSendMessage({ message })}
          className="ml-auto"
          size="sm"
          variant="default"
          disabled={sending}
        >
          {sending && <Spinner data-icon="inline-start" />}
          Enviar
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};