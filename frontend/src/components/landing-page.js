// src/components/LandingPage.js

import React from 'react'; //The core library for building user interfaces
import { Link } from "react-router-dom"; //A React Router component to navigate between pages without reloading
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Search, Users, Home, Shield } from "lucide-react"; //Lucide is a set of clean and consistent icons for React

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">RoommateFinder</h1>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Find Your Perfect Roommate</h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect with compatible roommates in your area and find your ideal living situation.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {[
            { icon: Search, title: "Smart Matching", description: "Our algorithm finds the most compatible roommates based on your preferences." },
            { icon: Users, title: "Verified Profiles", description: "All users are verified to ensure a safe and trustworthy community." },
            { icon: Home, title: "Diverse Listings", description: "Find shared apartments, houses, or rooms that suit your needs and budget." },
            { icon: Shield, title: "Secure Messaging", description: "Communicate safely with potential roommates through our platform." },
          ].map((feature, index) => (
            <Card key={index}>
              <Card.Header>
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <Card.Title>{feature.title}</Card.Title>
              </Card.Header>
              <Card.Content>
                <p>{feature.description}</p>
              </Card.Content>
            </Card>
          ))}
        </section>

        {/* How It Works Section */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: 1, title: "Create Your Profile", description: "Sign up and tell us about yourself, your preferences, and what you're looking for in a roommate." },
              { step: 2, title: "Browse Matches", description: "View potential roommates and listings that match your criteria and location preferences." },
              { step: 3, title: "Connect and Meet", description: "Message your matches, schedule meetups, and find your perfect roommate match!" },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Ideal Roommate?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of happy roommates who found their perfect match on RoommateFinder.
          </p>
          <Button size="lg" asChild>
            <Link to="/signup">Sign Up Now</Link>
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} RoommateFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
