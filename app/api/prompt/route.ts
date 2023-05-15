import { connectDb } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async () => {
  try {
    await connectDb();
    const prompts = await Prompt.find().populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong",{status: 500})
  }
};
