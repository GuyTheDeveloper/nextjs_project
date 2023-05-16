import PromptCard from "./prompt-card";

type Prompt = {
  _id: string;
  creator: {
    _id: string;
    username: string;
    email: string;
    image: string;
  };
  prompt: string;
  tag: string;
  __v: number;
};

interface Props {
  name: string;
  desc: string;
  data: Prompt[];
  handleEdit?: (post: Prompt) => void;
  handleDelete?: (post: Prompt) => void;
}

const Profile: React.FC<Props> = ({
  name,
  desc,
  data = [],
  handleEdit,
  handleDelete,
}) => {
  return (
    <section className="w-full">
      <h2 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h2>
      <p className="desc text-left">{desc}</p>

      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
