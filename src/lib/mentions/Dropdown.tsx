import { type User } from "@/app/page";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  show: boolean;
  users: User[];
  cursorPosition: [number, number];
  onClose: () => void;
  onSelect: (user: User) => void;
};

const Dropdown = ({
  show,
  users,
  cursorPosition,
  onClose,
  onSelect,
}: Props) => {
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState<User[]>([]);
  const [selected, setSelected] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.length > 0) {
      const regex = new RegExp(input, "i");
      setFiltered(users.filter((user) => regex.test(user.name)));
      setSelected(-1);
    } else {
      setFiltered(users);
    }
  }, [input, users]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [show]);

  useEffect(() => {
    if (selected >= 0) {
      const element = document.getElementById(`dropdown_item_${selected}`);
      element?.scrollIntoView();
    } else {
      inputRef.current?.scrollIntoView();
    }
  }, [selected]);

  return (
    <div
      className={`absolute h-40 w-52 overflow-y-auto rounded border border-gray-300 bg-gray-50 p-1 text-gray-900 shadow-lg ${show ? "" : "hidden"}`}
      style={{ top: cursorPosition[0], left: cursorPosition[1] }}
    >
      <input
        type="text"
        value={input}
        ref={inputRef}
        className="mb-1 w-full rounded border-2 border-black px-1 py-0.5"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          switch (e.key) {
            case "ArrowDown": {
              if (selected < filtered.length - 1) {
                setSelected(selected + 1);
              }
              break;
            }
            case "ArrowUp": {
              if (selected > 0) {
                setSelected(selected - 1);
              } else {
                setSelected(-1);
              }
              break;
            }
            case "Enter":
              if (selected >= 0) {
                const user = filtered.at(selected);
                if (user) onSelect(user);
                setSelected(-1);
                setInput("");
              }
              e.preventDefault();
              break;
            case "Escape":
            case "Delete":
              onClose();
              break;
          }
        }}
      />

      <ul className="space-y-1">
        {filtered.map((user, index) => {
          return (
            <li
              className={`cursor-pointer rounded px-1 py-1 hover:bg-gray-300 ${index == selected ? "bg-gray-300" : "bg-gray-50"}`}
              key={user.id}
              id={`dropdown_item_${user.id}`}
              onClick={() => {
                onSelect(user);
                setSelected(-1);
                setInput("");
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-300">
                  {user.name.at(0)}
                </div>
                {user.name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
