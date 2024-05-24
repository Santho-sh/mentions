import React, { forwardRef } from "react";
import { GetFormatedText } from "./GetFormatedText";

export const Input = forwardRef<HTMLDivElement, Props>(
  ({ value, setValue }, ref) => {
    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (event.ctrlKey || event.altKey) return;

      const key = event.key;
      event.preventDefault();
      switch (key) {
        case "Backspace":
          if (value.length > 0) {
            const regex = /\[([A-Za-z0-9 ]+)\]\(\w+\)/gi;

            setValue((str) => {
              const userMention = [...value.matchAll(regex)].at(-1);
              if (userMention) {
                if (userMention.index + userMention[0].length == value.length) {
                  return str.slice(0, userMention.index);
                }
              }
              return str.slice(0, value.length - 1);
            });
          }
          break;
        default:
          if (key.match(/^[-\w’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]$/u)) {
            setValue((str) => str + key);
          }
      }
    }

    return (
      <>
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          className="relative h-24 w-[30rem] overflow-y-scroll rounded bg-white p-4 text-black caret-transparent"
          onKeyDown={handleKeyDown}
        >
          <GetFormatedText cursor text={value} />
        </div>
      </>
    );
  },
);

Input.displayName = "MentionInput";

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
