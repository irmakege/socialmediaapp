"use client";

import React, { useState, FormEvent } from "react";
import { useFormStatus } from "react-dom";



const SharePost = ({ userId }) => {
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { pending } = useFormStatus();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch( "http://localhost:3000/api/sharepost", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          postDetails: description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to share post');
      }

      const data = await response.json();
      console.log('Post shared successfully:', data);
      alert('Post shared successfully!');
    } catch (err) {
      console.error('Error sharing post:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-10 p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      <div className="flex-1">
        <form className="flex gap-4" onSubmit={handleSubmit}>
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <div>
            <button
              className="bg-blue-500 p-2 mt-2 rounded-md text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="inline-block h-[10px] w-[10px] animate-spin rounded-full border-2 border-white-300 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                  Sharing...
                </div>
              ) : (
                "Share Post"
              )}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SharePost;