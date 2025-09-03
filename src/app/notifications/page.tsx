
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, CheckCircle2, PartyPopper } from "lucide-react";

const notifications = [
  {
    icon: Calendar,
    title: "New event: Annual Tech Conference",
    time: "5m ago",
    color: "text-primary",
  },
  {
    icon: CheckCircle2,
    title: "Your RSVP for Summer Music Fest is confirmed.",
    time: "1h ago",
    color: "text-green-500",
  },
  {
    icon: PartyPopper,
    title: "Community Cleanup Day is this weekend!",
    time: "1d ago",
    color: "text-yellow-500",
  },
  {
    icon: Calendar,
    title: "New event: Modern Art Exhibition",
    time: "2d ago",
    color: "text-primary",
  },
  {
    icon: CheckCircle2,
    title: "Your profile information has been updated.",
    time: "1w ago",
    color: "text-green-500",
  }
];

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 font-headline text-3xl">
            <Bell className="h-8 w-8 text-primary" />
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                <notification.icon className={`h-6 w-6 mt-1 shrink-0 ${notification.color}`} />
                <div className="flex-grow">
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
