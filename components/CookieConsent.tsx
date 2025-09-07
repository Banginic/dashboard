"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) setShow(true);
    }, 60000); // 1 minute

    return () => clearTimeout(timer);
  }, []);

  const handleConsent = (choice: string) => {
    localStorage.setItem("cookie_consent", choice);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:right-auto z-50">
      <Card className="shadow-xl rounded-2xl max-w-md">
        <CardContent className="p-4 space-y-3">
          <p className="text-sm text-secondary-foreground">
            We use cookies to enhance your browsing experience. Manage your
            settings or accept all cookies.
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleConsent("rejected")}
            >
              Reject
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => router.push("/cookies-settings")}
            >
              Manage Settings
            </Button>
            <Button size="sm" className="bg-accent" onClick={() => handleConsent("accepted")}>
              Accept
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
