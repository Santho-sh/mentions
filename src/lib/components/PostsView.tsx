"use client";

import React, { useEffect, useState } from "react";
import { type Post } from "@/app/page";
import { GetFormatedText } from "../mentions/GetFormatedText";

function timeSince(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export function PostsView({ posts }: props) {
  const [, setTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => t + 5000);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="mb-3 w-[480px]">
      {posts.map((post, index) => (
        <div
          key={index}
          className="mt-3 flex flex-col gap-3 rounded bg-purple-50 p-5 text-black"
        >
          <GetFormatedText text={post.value} />

          <div className="flex gap-3 border-t-2 pt-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-300">
              {post.postedBy.name.at(0)}
            </div>
            <div className="flex flex-col">
              <p>{post.postedBy.name}</p>
              <p className="text-sm text-gray-500">
                {timeSince(post.postedAt)} ago
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

type props = {
  posts: Post[];
};
