import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/Button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/Card";
import { CardContent } from "./ui/CardContent";
import { CardHeader } from "./ui/CardHeader";
import { CardTitle } from "./ui/CardTitle";
import { PlusCircle, Bell, MessageSquare, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoggedInHomePage() {
  const [posts, setPosts] = useState([]); // To store posts data
  const [profilePicture, setProfilePicture] = useState(null); // Profile picture URL
  const [isOpen, setIsOpen] = useState(false); // Dropdown menu state
  const [showCreatePost, setShowCreatePost] = useState(false); // Modal visibility
  const [newPost, setNewPost] = useState({ title: "", content: "", cost: "", location: "" }); // New post data
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fetch posts and user profile picture
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch user data
        const userResponse = await axios.get("http://127.0.0.1:8000/api/user/", {
          withCredentials: true,
        });
        const userId = userResponse.data.user.user_id;

        // Step 2: Fetch profile picture
        const profileResponse = await axios.get(
          `http://127.0.0.1:8000/api/profile/${userId}/`,
          { withCredentials: true }
        );
        setProfilePicture(profileResponse.data.profile_picture);

        // Step 3: Fetch posts
        const postsResponse = await axios.get("http://127.0.0.1:8000/api/posts/", {
          withCredentials: true,
        });
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Dropdown menu handling
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout/",
        {},
        { withCredentials: true }
      );
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Handle post submission
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/posts/",
        newPost,
        { withCredentials: true }
      );
      setPosts([response.data, ...posts]); // Add new post to the top of the list
      setShowCreatePost(false); // Close the modal
      setNewPost({ title: "", content: "", cost: "", location: "" }); // Reset form
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">RoommateFinder</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={profilePicture || "https://via.placeholder.com/48"}
                    alt="User Profile"
                  />
                </Avatar>
              </Button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <a
                      onClick={() => navigate("/profile")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                      role="menuitem"
                    >
                      <User className="mr-3 h-5 w-5 text-gray-400" />
                      Profile
                    </a>
                    <a
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                      role="menuitem"
                    >
                      <LogOut className="mr-3 h-5 w-5 text-gray-400" />
                      Log out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Find Your Perfect Roommate</h2>
            <Button onClick={() => setShowCreatePost(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Post
            </Button>
          </div>
        </section>

        {/* Modal for Create Post */}
        {showCreatePost && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Create Post</h2>
              <form onSubmit={handleCreatePost}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newPost.title}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <textarea
                    name="content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Cost</label>
                  <input
                    type="number"
                    name="cost"
                    value={newPost.cost}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={newPost.location}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" onClick={() => setShowCreatePost(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Posts */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Existing Posts</h2>
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{post.content || "No description available."}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No posts available.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default LoggedInHomePage;
