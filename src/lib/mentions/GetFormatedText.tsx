import React from "react";

export function GetFormatedText({
  text,
  className,
  cursor = false,
}: {
  text: string;
  cursor?: boolean;
  className?: string;
}) {
  // [user](user_id)
  const regex = /\[([A-Za-z0-9 ]+)\]\(\w+\)/gi;
  const userMentions = text.matchAll(regex);
  if (!userMentions) {
    return text;
  }

  const elements: React.ReactElement[] = [];

  let i = 0;
  for (const userMention of userMentions) {
    const index = userMention.index;
    const user = userMention.at(0);
    const username = userMention.at(1);

    if (index > i) {
      const span = React.createElement(
        "span",
        {
          key: i,
        },
        text.slice(i, index),
      );
      elements.push(span);
      i = index;
    }

    if (user && username) {
      const span = React.createElement(
        "span",
        {
          key: i,
          className: "font-semibold text-purple-700",
        },
        username,
      );
      elements.push(span);
      i = index + user.length;
    }
  }

  if (text.length > i) {
    const span = React.createElement(
      "span",
      { key: i },
      text.slice(i, text.length),
    );
    elements.push(span);
  }

  if (cursor)
    elements.push(
      <span key="cursor" id="cursor" className="animate-blink ml-0.5">
        |
      </span>,
    );

  return <div>{...elements}</div>;
}
