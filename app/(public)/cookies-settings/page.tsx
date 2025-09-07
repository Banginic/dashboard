"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CookieSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    essential: true, // always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("cookie_preferences");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    localStorage.setItem("cookie_preferences", JSON.stringify(settings));
    router.push('/')
  };

  const handleChange = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-[95%] max-w-2xl mx-auto p-6 border rounded-sm bg-secondary text-secondary-foreground min-h-screen my-8" >
      <h1 className="text-2xl font-semibold mb-4">Cookie Settings</h1>
      <p className="text-secondary-foreground/80 mb-6">
        Manage your cookie preferences below. Essential cookies are required for
        the website to function.
      </p>

      {/* Essential */}
      <Card className="mb-4">
        <CardContent className="p-4 flex items-center justify-between">
          <span>Essential Cookies</span>
          <input type="checkbox" checked readOnly disabled />
        </CardContent>
      </Card>

      {/* Analytics */}
      <Card className="mb-4">
        <CardContent className="p-4 flex items-center justify-between">
          <span>Analytics Cookies</span>
          <input
            type="checkbox"
            checked={settings.analytics}
            onChange={(e) => handleChange("analytics", e.target.checked)}
          />
        </CardContent>
      </Card>

      {/* Marketing */}
      <Card className="mb-4">
        <CardContent className="p-4 flex items-center justify-between">
          <span>Marketing Cookies</span>
          <input
            type="checkbox"
            checked={settings.marketing}
            onChange={(e) => handleChange("marketing", e.target.checked)}
          />
        </CardContent>
      </Card>

      <Button className="bg-accent text-accent-foreground" onClick={handleSave}>Save Preferences</Button>
    </div>
  );
}
