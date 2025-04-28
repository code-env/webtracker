"use client"

import { Copy, Globe } from "lucide-react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface SnippetProps {
  domain: string
  title: string
  description: string
}

export default function Snippet({ domain, title, description }: SnippetProps) {
  const react_snippet = `<script
  defer
  data-domain="${domain}"
  src="https://webtracker.avikmukherjee.tech/tracking-script.js"
>
</script>`

  const next_snippet = `import Script from "next/script";
// ...
<Script
  defer
  data-domain="${domain}"
  src="https://webtracker.avikmukherjee.tech/tracking-script.js"
/>`

  const copySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet)
    toast("Copied to Clipboard")
  }

  return (
    <Card className="w-full shadow-md">
      <CardContent className="pt-6 p-4 sm:p-6">
        <div className="flex flex-col gap-2 mb-5 pb-2 border-b border-sky-100">
          <div className="flex items-center gap-2">
            <div className="bg-sky-50 p-2 rounded-full">
              <Globe className="h-5 w-5 text-sky-500" />
            </div>
            <h1 className="text-lg font-semibold text-sky-700">{title}</h1>
          </div>
          <p className="text-xs sm:text-sm text-sky-500 sm:ml-2">{description}</p>
        </div>
        <Tabs defaultValue="JavaScript/React.js" className="w-full">
          <TabsList className="w-full bg-sky-50 rounded-lg">
            <TabsTrigger
              value="JavaScript/React.js"
              className="data-[state=active]:bg-sky-500 data-[state=active]:text-white text-sky-600"
            >
              JavaScript / React.js
            </TabsTrigger>
            <TabsTrigger
              value="Next.js"
              className="data-[state=active]:bg-sky-500 data-[state=active]:text-white text-sky-600"
            >
              Next.js
            </TabsTrigger>
          </TabsList>

          <TabsContent value="JavaScript/React.js" className="mt-5">
            <div className="rounded-lg bg-white border border-sky-100 shadow-sm p-3 sm:p-4 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                <p className="text-xs sm:text-sm font-medium text-sky-700 flex items-center">
                  <span className="bg-sky-50 p-1 rounded-md mr-2 text-sky-600 text-xs">HTML</span>
                  Add to your index.html:
                </p>
                <Button
                  onClick={() => copySnippet(react_snippet)}
                  variant="ghost"
                  size="sm"
                  className="border border-sky-100 text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-md"
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="overflow-x-auto max-w-full rounded-md">
                <SyntaxHighlighter
                  language="html"
                  style={oneDark}
                  customStyle={{
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(186, 230, 253, 0.4)",
                    fontSize: "12px",
                    maxWidth: "100%",
                    overflow: "auto",
                    wordBreak: "break-all",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {react_snippet}
                </SyntaxHighlighter>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="Next.js" className="mt-5">
            <div className="rounded-lg bg-white border border-sky-100 shadow-sm p-3 sm:p-4 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                <p className="text-xs sm:text-sm font-medium text-sky-700 flex items-center">
                  <span className="bg-sky-50 p-1 rounded-md mr-2 text-sky-600 text-xs">TSX</span>
                  Add to your app/layout.tsx:
                </p>
                <Button
                  onClick={() => copySnippet(next_snippet)}
                  variant="ghost"
                  size="sm"
                  className="border border-sky-100 text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-md"
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="overflow-x-auto max-w-full rounded-md">
                <SyntaxHighlighter
                  language="jsx"
                  style={oneDark}
                  customStyle={{
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(186, 230, 253, 0.4)",
                    fontSize: "12px",
                    maxWidth: "100%",
                    overflow: "auto",
                    wordBreak: "break-all",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {next_snippet}
                </SyntaxHighlighter>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
