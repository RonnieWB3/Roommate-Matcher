import { useState } from "react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Select } from "@components/ui/select"
import Slider from "@components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover"
import { Search, MapPin, DollarSign, Users, Bell, MessageSquare, SlidersHorizontal, PlusCircle } from "lucide-react"

export default function LoggedInHomePageWithCreatePost() {
  const [priceRange, setPriceRange] = useState([500, 2000])

  return (
    <div className="min-h-screen bg-gray-100">
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
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Find Your Perfect Roommate</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Post
            </Button>
          </div>
          <div className="flex gap-4">
            <div className="flex-grow">
              <Input placeholder="Search by location" className="w-full" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Price Range</h4>
                    <Slider
                      min={0}
                      max={5000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Number of Rooms</h4>
                    <Select>
                      <option value="">Any</option>
                      <option value="1">1 Room</option>
                      <option value="2">2 Rooms</option>
                      <option value="3">3 Rooms</option>
                      <option value="4+">4+ Rooms</option>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Potential Roommates</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://i.pravatar.cc/48?img=${index + 1}`} alt={`User ${index + 1}`} />
                    <AvatarFallback>U{index + 1}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>John Doe</CardTitle>
                    <p className="text-sm text-muted-foreground">Age: 28</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Budget: $1000 - $1500</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Users className="h-4 w-4" />
                    <span>2 Rooms Available</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">Non-smoker</Badge>
                    <Badge variant="secondary">Pet-friendly</Badge>
                    <Badge variant="secondary">Early bird</Badge>
                  </div>
                  <p className="text-sm mb-4">
                    Looking for a clean and quiet roommate. I work in tech and enjoy hiking on weekends.
                  </p>
                  <Button className="w-full">
                    <Users className="mr-2 h-4 w-4" /> Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 RoommateFinder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}