import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      <NextThemesProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange={true}
        enableColorScheme={true}
      >
        {children}
      </NextThemesProvider>
    </div>
  );
}

export default DashboardLayout;
