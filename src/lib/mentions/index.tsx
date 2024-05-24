"use client";

import { type Post, type User } from "@/app/page";
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { Input } from "./Input";

type props = {
  users: User[];
  currentUser: User;
  trigger?: string;
  onPost: (post: Post) => void;
};

export function MentionInput({
  users,
  currentUser,
  onPost,
  trigger = "@",
}: props) {
  const [value, setValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState<[number, number]>([
    0, 0,
  ]);
  const [showDropdown, setShowDropdown] = useState({
    show: false,
    position: 0,
    search: "",
  });
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.endsWith(trigger)) {
      setShowDropdown({ show: true, position: value.length - 1, search: "" });

      const cursorElement = document.getElementById("cursor");
      const top = cursorElement?.offsetTop ?? 16;
      const left = cursorElement?.offsetLeft ?? value.length * 16;
      setCursorPosition([top, left]);
    } else if (showDropdown.show) {
      if (value.length > showDropdown.position) {
        const search = value.slice(showDropdown.position + 1, value.length);
        setShowDropdown((curr) => ({ ...curr, search }));
      } else {
        setShowDropdown({ show: false, position: 0, search: "" });
      }
    }
  }, [showDropdown.position, showDropdown.show, trigger, value]);

  useEffect(() => {
    if (!showDropdown.show) inputRef.current?.focus();
  }, [showDropdown.show]);

  return (
    <div className="relative mt-10 flex flex-col items-end gap-4">
      <Input ref={inputRef} value={value} setValue={setValue} />

      <Dropdown
        show={showDropdown.show}
        users={users}
        onClose={() => {
          setValue((val) => val.slice(0, showDropdown.position));
          setShowDropdown({ show: false, position: 0, search: "" });
        }}
        cursorPosition={cursorPosition}
        onSelect={(user: User) => {
          setShowDropdown({ show: false, position: 0, search: "" });
          setValue(
            (val) =>
              val.slice(0, showDropdown.position) +
              ` [${user.name}](${user.id}) `,
          );
        }}
      />

      <button
        type="button"
        onClick={() => {
          onPost({
            postedBy: currentUser,
            postedAt: new Date(),
            value: value,
          });
          setValue("");
        }}
        className="rounded bg-purple-500 px-8 py-2"
      >
        Post
      </button>
    </div>
  );
}
