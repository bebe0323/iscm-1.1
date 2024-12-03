"use client";

import { TypePreStartTalkClient } from "@/app/types/preStartTalk";

export default function PreStartList({
  preStartTalks
}: {
  preStartTalks: TypePreStartTalkClient[];
}) {
  return (
    <div>
      {preStartTalks.map((preStartTalk) => (
        <div key={preStartTalk._id.toString()}>{preStartTalk.safety}</div>
      ))}
    </div>
  )
}