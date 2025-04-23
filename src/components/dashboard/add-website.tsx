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
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import Snippet from "./snippet";

export default function AddWebsite() {
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [error, setError] = useState("");

  // Set the name automatically when website changes
  useEffect(() => {
    if (!name || name === "") {
      setName(website);
    }
  }, [website, name]);

  const addWebsite = async () => {
    if (website.trim() === "" || loading) return;
    setLoading(true);
    
    try {
      // Submit to your API
      const response = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: website.trim(),
          name: name.trim() || website.trim(),
          description: description.trim(),
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to add website");
      }

      if (data.success) {
        toast.success(data.message || "Website added successfully");
        router.refresh();
        setStep(2);
      } else {
        toast.error(data.message || "Failed to add website");
      }
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to add website");
    } finally {
      setLoading(false);
    }
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
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-500">Website Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Website"
                className="bg-white text-black focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-500">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your website"
                className="bg-white text-black focus:border-blue-500 focus:ring-blue-500"
              />
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
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-blue-500">Installation Instructions</h3>
              <p className="text-sm text-blue-400">
                Add the following tracking script to your website to start collecting analytics:
              </p>
            </div>
            
            <Snippet domain={website.trim()} />
            
            <Button
              onClick={() => router.push(`/dashboard/${website.trim()}`)}
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