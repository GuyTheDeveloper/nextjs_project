"use client";

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

import { useState, useEffect, ChangeEvent } from "react";
import PromptCard from "./prompt-card";

const PromptCardList = ({
  data = [],
  handleTagClick,
}: {
  data: Prompt[];
  handleTagClick: (tagName: string) => void;
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.length >= 1
        ? data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          ))
        : null}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState<Prompt[] | []>([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<string | null | any>(null);
  const [searchedResults, setSearchedResults] = useState<Prompt[] | []>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
