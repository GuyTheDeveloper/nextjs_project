import Prompt from "@/models/prompt";
import { connectDb } from "@/utils/database";

interface Props {
  params: {
    promptId: string;
  };
}

export const GET = async (req: Request, { params: { promptId } }: Props) => {
  try {
    await connectDb();
    const prompt = await Prompt.findById(promptId).populate("creator");

    if (!prompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

export const PATCH = async (req: Request, { params: { promptId } }: Props) => {
  const { prompt, tag } = await req.json();

  try {
    await connectDb();

    let existingPrompt = await Prompt.findById(promptId);

    if (!existingPrompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (req: Request, { params: { promptId } }: Props) => {
  try {
    await connectDb();

    await Prompt.findByIdAndRemove(promptId);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
