import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your automations, integrations, and notification preferences.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Smart Scheduler</CardTitle>
            <CardDescription>
              Integrate with Google Calendar to automate stand-ups, sprints, or follow-ups.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="gcal-integration" className="text-base">Google Calendar Integration</Label>
                <p className="text-sm text-muted-foreground">
                  Connect your Google Calendar to enable scheduling.
                </p>
              </div>
              <Button>Connect</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="auto-standup" className="text-base">Automated Daily Stand-ups</Label>
                 <p className="text-sm text-muted-foreground">
                  Schedule a recurring event for your team's stand-up.
                </p>
              </div>
              <Switch id="auto-standup" disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification System</CardTitle>
            <CardDescription>
              Receive notifications for completed automations and pending approvals via Firebase Cloud Messaging.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="browser-notifications" className="text-base">Enable Browser Notifications</Label>
              <Switch id="browser-notifications" />
            </div>
            <Separator />
            <div className="space-y-4">
              <h4 className="text-md font-medium">Notify me for:</h4>
              <div className="flex items-center justify-between">
                <Label htmlFor="automation-complete">Automation Completions</Label>
                <Switch id="automation-complete" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="approval-required">Approvals Required</Label>
                <Switch id="approval-required" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="task-failures">Task Failures</Label>
                <Switch id="task-failures" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
