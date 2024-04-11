import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Post from './Post';

const InfiniteScrollComponent = ({ email }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      if (!hasMore || loading || loadingNextPage) return;
      setLoading(true);
      setLoadingNextPage(true);
      const response = await axios.get(`http://localhost:8000/app/get-posts?page=${currentPage}&email=${email}`);
      setPosts(prevPosts => {
        if (currentPage === 1) {
          return response.data;
        } else {
          return [...prevPosts, ...response.data];
        }
      });
      setCurrentPage(prevPage => prevPage + 1);
      setLoading(false);
      setLoadingNextPage(false); 
      if (response.data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
      setLoadingNextPage(false);
    }
  }, [hasMore, loading, loadingNextPage, currentPage, email]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      ) {
        fetchPosts();
      }
    }, 500);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchPosts]);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <Post
            username={post.username}
            imageUrl={post.mediaUrl}
            title={post.title}
            description={post.description}
            timestamp={post.timestamp}
          />
        </div>
      ))}
      {loading && <p className="text-center">Loading...</p>}
      {!hasMore && <p className="text-center">No more posts to load</p>}
    </div>
  );
};

export default InfiniteScrollComponent;
