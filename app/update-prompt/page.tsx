"use client";

import Form from "@/components/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPromptPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const res = await fetch(`/api/prompt/${promptId}`);
        const prompt = await res.json();
        setPost({
          prompt: prompt.prompt,
          tag: prompt.tag,
        });
      } catch (error) {}
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPromptPage;
