import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/Card";
import { CardContent } from "./ui/CardContent";
import { CardHeader } from "./ui/CardHeader";
import { CardTitle } from "./ui/CardTitle";
import { Badge } from "./ui/badge";
import { MapPin, Calendar, Edit, User, LogOut } from "lucide-react";
import axios from "axios";

function UserProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Profile data
  const [posts, setPosts] = useState([]); // Post data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isOpen, setIsOpen] = useState(false); // Dropdown state
  const dropdownRef = useRef(null);

  // Fetch user and post data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUserResponse = await axios.get("http://127.0.0.1:8000/api/user/", {
          withCredentials: true,
        });
        const userId = currentUserResponse.data.user.user_id;

        const profileResponse = await axios.get(
          `http://127.0.0.1:8000/api/profile/${userId}/`,
          { withCredentials: true }
        );

        setUser(profileResponse.data);

        const postsResponse = await axios.get(
          `http://127.0.0.1:8000/api/profile/${userId}/posts/`,
          { withCredentials: true }
        );

        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching user data or posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Dropdown menu toggling
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

  // Logout functionality
  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout/", {}, { withCredentials: true });
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error: User data could not be loaded.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">RoommateFinder</h1>
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profile_picture} alt={user.username} />
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
                    href="/profile"
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
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="relative mb-8">
          <div className="h-64 w-full overflow-hidden rounded-t-lg">
            <img
              src={user.background_picture}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4 flex items-end space-x-4">
            <Avatar className="w-32 h-32 border-2 border-white">
              <AvatarImage src={user.profile_picture} alt={user.username} />
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold text-white">{user.username}</h2>
              <p className="text-white flex items-center">
                <MapPin className="h-4 w-4 mr-1" /> {user.location}
              </p>
            </div>
          </div>
          <Button className="absolute bottom-4 right-4" variant="secondary">
            <Edit className="h-4 w-4 mr-2" /> Edit Profile
          </Button>
        </div>

        {/* About Me Section */}
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user.bio}</p>
            <div className="mt-4 flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                Age: {user.age}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {user.location}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Post Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {posts.length > 0 ? (
              <ul className="space-y-4">
                {posts.map((post) => (
                  <li key={post.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-semibold mb-1">{post.title}</h3>
                    <p>{post.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No posts available.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default UserProfilePage;
