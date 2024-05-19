"use client";

import { MentionInput } from "@/lib/mentions";
import { PostsView } from "@/lib/components/PostsView";
import { useState } from "react";

export type User = {
  id: string;
  name: string;
};

export type Post = {
  postedBy: User;
  postedAt: Date;
  value: string;
};

const currentUser: User = {
  id: "33",
  name: "Santhosh",
};

const users: User[] = [
  { id: "1", name: "Alice Smith" },
  { id: "2", name: "Bob Johnson" },
  { id: "3", name: "Carol Brown" },
  { id: "4", name: "David Lee" },
  { id: "5", name: "Emily Patel" },
  { id: "6", name: "Frank Garcia" },
  { id: "7", name: "Grace Kim" },
  { id: "8", name: "Henry Adams" },
  { id: "9", name: "Irene Clark" },
  { id: "10", name: "Jack Turner" },
  { id: "11", name: "Kate Mitchell" },
  { id: "12", name: "Liam Hall" },
  { id: "13", name: "Mia White" },
  { id: "14", name: "Noah Martinez" },
  { id: "15", name: "Olivia Scott" },
  { id: "16", name: "Peter Wright" },
  { id: "17", name: "Quinn Harris" },
  { id: "18", name: "Rachel Lewis" },
  { id: "19", name: "Sam Robinson" },
  { id: "20", name: "Tyler Young" },
];
export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  function savePost(post: Post) {
    setPosts([post, ...posts]);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <MentionInput users={users} currentUser={currentUser} onPost={savePost} />
      <PostsView posts={posts} />
    </main>
  );
}
