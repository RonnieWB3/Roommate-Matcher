import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.tsx';
import { Search, Users, Home, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">RoommateFinder</h1>
          <div className="flex space-x-2">
            <Button aschild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button aschild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Find Your Perfect Roommate</h2>
          <p className="text-xl text-gray-600 mb-8">
            Connect with compatible roommates in your area and find your ideal living situation.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {[
            { icon: Search, title: "Smart Matching", description: "Our algorithm finds the most compatible roommates based on your preferences." },
            { icon: Users, title: "Verified Profiles", description: "All users are verified to ensure a safe and trustworthy community." },
            { icon: Home, title: "Diverse Listings", description: "Find shared apartments, houses, or rooms that suit your needs and budget." },
            { icon: Shield, title: "Secure Messaging", description: "Communicate safely with potential roommates through our platform." },
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
