import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SnippetProps {
  domain: string;
}

export default function Snippet({ domain }: SnippetProps) {
  const react_snippet = `<script
  defer
  data-domain="${domain}"
  src="https://webtracker.avikmukherjee.tech/tracking-script.js"
>
</script>`;

  const next_snippet = `<Script
  defer
  data-domain="${domain}"
  src="https://webtracker.avikmukherjee.tech/tracking-script.js"
/>`;

  const copySnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    toast("Copied to Clipboard");
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6 p-3 sm:p-4">
        <Tabs defaultValue="JavaScript/React.js" className="w-full">
          <TabsList className="w-full grid grid-cols-2 sm:grid-cols-2 bg-sky-100">
            <TabsTrigger 
              value="JavaScript/React.js"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-500 text-xs sm:text-sm"
            >
              JavaScript / React.js
            </TabsTrigger>
            <TabsTrigger 
              value="Next.js"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-600 text-xs sm:text-sm"
            >
              Next.js
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="JavaScript/React.js" className="mt-4">
            <div className="rounded-lg bg-white border border-sky-200 p-2 sm:p-3 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                <p className="text-xs sm:text-sm text-sky-700">
                  Add to your index.html:
                </p>
                <Button
                  onClick={() => copySnippet(react_snippet)}
                  variant="ghost"
                  size="sm"
                  className="border border-sky-200 text-blue-500 hover:text-blue-600 hover:bg-blue-100"
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="overflow-x-auto max-w-full">
                <SyntaxHighlighter
                  language="html"
                  style={oneDark}
                  customStyle={{
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid rgba(186, 230, 253, 0.4)',
                    fontSize: '12px',
                    maxWidth: '100%',
                    overflow: 'auto',
                    wordBreak: 'break-all',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {react_snippet}
                </SyntaxHighlighter>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="Next.js" className="mt-4">
            <div className="rounded-lg bg-white border border-sky-200 p-2 sm:p-3 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                <p className="text-xs sm:text-sm text-sky-700">
                  Add to your app/layout.tsx:
                </p>
                <Button
                  onClick={() => copySnippet(next_snippet)}
                  variant="ghost"
                  size="sm"
                  className="border border-sky-200 text-sky-600 hover:text-sky-700 hover:bg-sky-50"
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="overflow-x-auto max-w-full">
                <SyntaxHighlighter
                  language="jsx"
                  style={oneDark}
                  customStyle={{
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    border: '1px solid rgba(186, 230, 253, 0.4)',
                    fontSize: '12px',
                    maxWidth: '100%',
                    overflow: 'auto',
                    wordBreak: 'break-all',
                    whiteSpace: 'pre-wrap'
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
  );
}