import Prompt from "@/models/prompt";
import { connectDb } from "@/utils/database";

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (req: Request, { params }: Params) => {
  try {
    await connectDb();
    const userPrompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(userPrompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
