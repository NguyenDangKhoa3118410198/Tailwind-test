import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  addPost,
  editTitle,
  fetchPostById,
  fetchPosts,
} from "../services/post";
import axios from "axios";

export const Posts = () => {
  const queryClient = useQueryClient();
  const [inputId, setInputId] = useState("");

  const {
    data: posts,
    isLoading: loadingPosts,
    isError: errorPosts,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { data: postById } = useQuery({
    queryKey: ["posts", inputId],
    queryFn: () => fetchPostById(inputId),
    enabled: !!inputId,
    retry: 2,
  });

  const addMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post added successfully!");
      addMutation.reset();
    },
  });

  const editMutation = useMutation({
    mutationFn: editTitle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const delMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleAddPost = () => {
    addMutation.mutate({ title: "New Post", body: "This is a new post" });
  };

  const handleEditPost = () => {
    editMutation.mutate({ id: 1, title: "Updated Post" });
  };

  const handleDeletePost = () => {
    delMutation.mutate(1);
  };

  if (loadingPosts) return <div>Loading posts...</div>;
  if (errorPosts) return <div>Error loading posts</div>;

  return (
    <div className="mt-8 flex justify-center items-center flex-col">
      <input
        type="number"
        onChange={(e) => setInputId(e.target.value)}
        placeholder="Enter post ID"
        className="border-2 border-gray-300 rounded-md p-2 mb-4 w-[120]"
      />
      <div className="flex gap-2">
        <button
          onClick={handleAddPost}
          className="border  p-2 rounded-lg  border-lime-600 text-lime-400"
        >
          Add
        </button>
        <button
          onClick={handleEditPost}
          className="border p-2 rounded-lg border-yellow-500 text-yellow-400"
        >
          Edit
        </button>
        <button
          onClick={handleDeletePost}
          className="border p-2 rounded-lg border-red-500 text-red-400"
        >
          Delete
        </button>
      </div>

      <h1 className="my-3 text-2xl font-bold">List of Posts</h1>
      <div className="overflow-x-auto">
        <table className="w-[1000px] bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
                ID
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
                Title
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
                Body
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
                User ID
              </th>
            </tr>
          </thead>
          <tbody>
            {inputId ? (
              postById ? (
                <tr key={postById.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {postById.id}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {postById.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {postById.body}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {postById.userId}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4">Not found...</td>
                </tr>
              )
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {post.id}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {post.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {post.body}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {post.userId}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
