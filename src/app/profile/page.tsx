import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  // In a real app, this data would come from your authentication context or an API call
  const user = {
    name: "Alex Doe",
    email: "alex.doe@example.com",
    initials: "AD",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    joined: "December 2023",
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-3xl">{user.initials}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Member since</p>
            <p className="font-medium">{user.joined}</p>
          </div>
          <div className="flex justify-center">
             <Button>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
