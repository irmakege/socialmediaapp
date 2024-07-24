'use client'; // Enable client-side rendering

import SharePost from "../../components/sharepost";
import DisplayPost from "../../components/displaypost"
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function Protected() {
  const router = useParams();
  const { id } = router;
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
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
        setPosts(json.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [id]);



  // Check if the id is defined
  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <SharePost userId={id} />
      <div className="user-posts">
        <h2>User Posts</h2>
        {posts.length === 0 ? (
          <p>No posts shared by you.</p>
        ) : (
          <ul className="post-list">
            <ul>
              {posts.map((post, index) => (
                <li key={index} className="post-item">
                  <DisplayPost
                    CardTitle=""
                    titleHref="/#"
                    btnHref="/#"
                    CardDescription={post.postDetails}
                    Button="View Details" />
                </li>
              ))}
            </ul>
          </ul>
        )}
      </div>
    </main>
  );
}
