import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/Card";
import { CardContent } from "./ui/CardContent";
import { CardHeader } from "./ui/CardHeader";
import { CardTitle } from "./ui/CardTitle";
import { Badge } from "./ui/badge";
import { MapPin, Calendar, Edit, User, LogOut, Mail } from "lucide-react";
import axios from "axios";

function UserProfilePage() {
  const navigate = useNavigate(); // Navigation hook
  const [user, setUser] = useState(null); // Stores the user's profile information.
  const [posts, setPosts] = useState([]); //Stores the user's posts
  const [isLoading, setIsLoading] = useState(true); // Tracks if the data is still being loaded
  const [isOpen, setIsOpen] = useState(false); // Tracks whether the dropdown menu is open
  const dropdownRef = useRef(null); // Used to detect clicks outside the dropdown menu to close it


  useEffect(() => {
    const fetchUserData = async () => { //Fetches the user's profile and posts data from the backend
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

  // Toggles the dropdown menu visibility
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

  // Logs the user out by making a POST request to the backend
  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout/", {}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) { //Displays a loading message until data fetching is complete
    return <div>Loading...</div>;
  }

  if (!user) { //Displays an error message if user data cannot be loaded
    return <div>Error: User data could not be loaded.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-white">RoommateFinder</h1>
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.profile_picture || "https://via.placeholder.com/48"} alt={user.username} />
              </Avatar>
            </Button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
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
        {/* Profile Banner */}
        <div className="relative mb-8">
          <div className="h-64 w-full overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-blue-300 to-purple-400">
            <img
              src={user.background_picture}
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4 flex items-center space-x-4">
            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
              <AvatarImage src={user.profile_picture} alt={user.username} />
            </Avatar>
            <div>
              <h2 className="text-3xl font-extrabold text-white">{user.username}</h2>
              <p className="text-white flex items-center">
                <MapPin className="h-4 w-4 mr-1" /> {user.location}
              </p>
            </div>
          </div>
          <Button className="absolute bottom-4 right-4 bg-transparent text-indigo-600 border-indigo-600 hover:text-indigo-800">
            <Edit className="h-4 w-4 mr-2" /> Edit Profile
          </Button>
        </div>

        {/* About Me Section */}
        <Card className="bg-gradient-to-br from-white to-gray-50 shadow-md">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user.bio}</p>
            <div className="mt-4 flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm bg-purple-100 text-purple-800">
                <Calendar className="h-4 w-4 mr-1" />
                Age: {user.age}
              </Badge>
              <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-800">
                <MapPin className="h-4 w-4 mr-1" />
                {user.location}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Posts Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4">My Posts</h2>
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-gradient-to-br from-blue-100 to-purple-200 shadow-lg rounded-lg p-4"
                >
                  <CardHeader>
                    <CardTitle className="text-indigo-800 font-bold">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{post.content}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Location: {post.location} | Cost: ${post.cost}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No posts available.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default UserProfilePage;
