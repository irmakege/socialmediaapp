'use client'

import { useState, useEffect } from 'react';

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/allposts');
        
        const data = await response.json();
        console.log(data)
        setPosts(data.posts);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main>
      {posts === undefined || posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div
              className="relative block overflow-hidden w-1/2 rounded-lg border border-gray-100 m-5 p-4 sm:p-6 lg:p-8"
            >

              <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                  <p className="mt-1 text-xs font-medium text-gray-600">John Doe</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-pretty text-sm text-gray-500">
                  {post.postDetails}
                </p>
              </div>

              <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                  <dd className="text-xs text-gray-500">{post.createdAt}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>)}
    </main>
  );
}
