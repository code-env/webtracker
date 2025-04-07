"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Snippet from "./snippet";

export default function AddWebsite() {
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [error, setError] = useState("");

  const addWebsite = async () => {
    if (website.trim() === "" || loading) return;
    setLoading(true);
    
    // Simulate adding website
    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const invalidChars = ["http", "://", "/", "https"];
    const hasInvalidChars = invalidChars.some((char) =>
      website.trim().includes(char)
    );

    if (hasInvalidChars) {
      setError("Please enter the domain only (e.g., google.com).");
    } else {
      setError("");
    }
  }, [website]);

  return (
    <Card className="text-white border-0 shadow-none bg-transparent overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-blue-500">Add Website</CardTitle>
        <CardDescription className="text-blue-500">
          Add your website to start tracking analytics
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-500">Domain</label>
              <Input
                value={website}
                onChange={(e) => setWebsite(e.target.value.trim().toLowerCase())}
                placeholder="example.com"
                className={`bg-white text-black focus:border-blue-500 focus:ring-blue-500 ${
                  error ? "border-red-500" : ""
                }`}
              />
              {error ? (
                <p className="text-sm text-red-400">{error}</p>
              ) : (
                <p className="text-sm text-blue-500">
                  Enter the domain or subdomain without &quot;www&quot;
                </p>
              )}
            </div>
            {!error && (
              <Button
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
                onClick={addWebsite}
                disabled={loading || !website.trim()}
              >
                {loading ? "Adding Website..." : "Add Website"}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <Snippet />
            <Button
              onClick={() => router.push(`/site/${website.trim()}`)}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
            >
              View Analytics
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}