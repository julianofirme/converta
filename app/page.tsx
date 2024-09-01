"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { jsonToYaml, jsonToTs, yamlToJson, xmlToJson, jsonToXml } from "@/convertions";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import SparklesText from "@/components/magicui/sparkles-text";
import { Copy } from "lucide-react";
import Editor from "@monaco-editor/react";
import prettier from "prettier/standalone";
import * as prettierPluginEstree from "prettier/plugins/estree";
const plugins = [
  require("prettier/parser-html"),
  require("prettier/parser-postcss"),
  require("prettier/parser-graphql"),
  require("prettier/parser-markdown"),
  require("prettier/parser-yaml"),
  require("prettier/parser-flow"),
  require("prettier/parser-typescript")
];

export default function Home() {
  const [from, setFrom] = useState("json");
  const [to, setTo] = useState("yaml");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const convertData = () => {
    setIsLoading(true);
    try {
      const conversions = {
        "json:yaml": jsonToYaml,
        "json:ts": jsonToTs,
        "yaml:json": yamlToJson,
        "xml:json": xmlToJson,
        "json:xml": jsonToXml,
      };
      const result = conversions[`${from}:${to}`](input);
      setOutput(result);
    } catch (error) {
      console.error("Error during conversion:", error);
      setOutput("Error during conversion.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const formatOutput = async () => {
      if (!output) return;
      try {
        const formattedOutput = await prettier.format(output, {
          parser: to === "ts" ? "typescript" : to,
          plugins: [...Object.values(plugins), prettierPluginEstree],
          useTabs: true,
          tabWidth: 2,
        });
        setOutput(formattedOutput);
      } catch (error) {
        console.error("Error during formatting:", error);
        setOutput("Error formatting output.");
      }
    };

    formatOutput();
  }, [output, to]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <main className="px-10 flex flex-col justify-center items-center h-screen w-screen">
      <SparklesText className="text-5xl font-bold text-center w-full mb-6" text="Converta" />
      <NeonGradientCard
        className="relative max-w-screen h-[85vh] items-center justify-center text-center"
        borderSize={0}
        neonColors={{ firstColor: "#4652F270", secondColor: "#4652F250" }}
      >
        <div className="bg-background rounded-lg border h-full p-6 w-full max-w-8xl">
          <p className="text-muted-foreground mb-6">
            Use as ferramentas abaixo para converter vários tipos de dados.
          </p>
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-4">
              <Label>Converta</Label>
              <Select defaultValue={from} onValueChange={setFrom}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="yaml">YAML</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                </SelectContent>
              </Select>
              <Label>para</Label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yaml">YAML</SelectItem>
                  <SelectItem value="ts">TypeScript</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-end gap-2">
            <div className="w-1/2">
              <Editor
                theme="vs-dark"
                height="56vh"
                defaultLanguage="json"
                value={input}
                onChange={(value) => setInput(value || "")}
                options={{
                  minimap: { enabled: false },
                  scrollbar: { vertical: "hidden", horizontal: "hidden" },
                }}
              /></div>
            <div className="w-1/2">
              <Button variant="secondary" className="w-fit mb-2" onClick={handleCopy}>
                Copiar <Copy className="h-4 ml-2" />
              </Button>
              <Editor
                theme="vs-dark"
                height="56vh"
                defaultLanguage={to}
                value={output}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  scrollbar: { vertical: "hidden", horizontal: "hidden" },
                }}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="rounded-md px-8 py-6 text-lg font-medium" onClick={convertData} disabled={isLoading}>
              Converta!
            </Button>
          </div>
        </div>
      </NeonGradientCard>
    </main>
  );
}
