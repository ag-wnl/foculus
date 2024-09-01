import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { currentUser } from "@clerk/nextjs/server";
import { BarChart, Clock, Settings, Star, TrendingUp } from "lucide-react";

export default async function Component() {
  const user = await currentUser();
  if (!user) return;

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 px-4 py-6 lg:p-12">
      <div className="w-full mx-auto p-4 space-y-6">
        {/* header user name and info section */}
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.imageUrl} alt={user?.firstName ?? "user"} />
            <AvatarFallback>
              {user.firstName
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle>{user.fullName}</CardTitle>
            <CardDescription>
              {user.primaryEmailAddress?.emailAddress}
            </CardDescription>
            <p className="text-sm text-muted-foreground mt-1">
              Member since {user.createdAt}
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <Button variant="outline" className="w-full mt-4">
            <Settings className="mr-2 h-4 w-4" />
            Customize goals
          </Button>
        </CardContent>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Productivity Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-32">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted-foreground stroke-current"
                      strokeWidth="10"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                    ></circle>
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeDasharray={`${2 * 2.51327}, 251.327`}
                      transform="rotate(-90 50 50)"
                    ></circle>
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <TrendingUp className="w-6 h-6 mx-auto mb-1 text-primary" />
                    <span className="text-2xl font-bold">{90}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-4 h-32">
                <Star className="w-12 h-12 text-yellow-400" />
                <span className="text-4xl font-bold">30 days</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tasks Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-4 h-32">
                <BarChart className="w-12 h-12 text-primary" />
                <span className="text-4xl font-bold">40</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time Saved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-4 h-32">
                <Clock className="w-12 h-12 text-primary" />
                <span className="text-4xl font-bold">23.5 hrs</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
