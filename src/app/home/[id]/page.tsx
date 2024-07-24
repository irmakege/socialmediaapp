'use client'; // Enable client-side rendering

import { useParams } from 'next/navigation';
import React, { useState, useEffect, FormEvent } from 'react';

export default function Protected() {
  const router = useParams();
  const { id } = router;

  //Page States
  const [posts, setPosts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState<string>("");
  const [errorShared, setSharedError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    fetchPosts(id);
  }, []);

 const sortPostsByDate = (posts) => {
    return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const fetchPosts = async (id) => {

    try {
      const response = await fetch('http://localhost:3000/api/getallpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const json = await response.json()
      
      console.log(json)
      const sortedPosts = sortPostsByDate(json.posts)
      setPosts(json.posts);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (postId) => {
    setIsDeleting(true);
    try {
      const response = await fetch('http://localhost:3000/api/deletepost', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      alert('Post deleted successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSharedError(null);

    try {
      const response = await fetch("http://localhost:3000/api/sharepost", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: id,
          postDetails: description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to share post');
      }

      const data = await response.json();

      alert('Post shared successfully!');
      window.location.reload();
    } catch (err) {
      console.error('Error sharing post:', err);
      setSharedError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <main>
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
              {errorShared && <p style={{ color: 'red' }}>{errorShared}</p>}
            </div>
          </form>
        </div>
      </div>
      <div className="user-posts">
        <h2>User Posts</h2>
        {posts.length === 0 ? (
          <p>No posts shared by you!</p>
        ) : (
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.id} className="post-item">
                <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
                  <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">

                    <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
                      {post.postDetails}
                    </p>
                    <button
                      className="bg-blue-500 p-2 mt-2 rounded-md text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
                      onClick={() => handleDelete(post.id)}
                      disabled={isDeleting}>
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>

                    <button 
                      className="bg-blue-500 p-2 mt-2 rounded-md text-white disabled:bg-blue-300 disabled:cursor-not-allowed"
                      >
                      Edit
                    </button>
                  </div>
                </div>
              </li>

            ))}

          </ul>

        )}
      </div>
    </main>
  );
}
