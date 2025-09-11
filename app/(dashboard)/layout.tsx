import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NextThemesProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    </div>
  );
}

export default AdminLayout;
