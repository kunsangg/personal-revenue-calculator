"use client";

import { Trash2, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfitStore } from "@/store/use-profit-store";
import { EmptyState } from "@/components/shared/empty-state";
import { FolderOpen } from "lucide-react";

export default function SettingsPage() {
  const { scenarios, loadScenario, deleteScenario, resetToDefaults } =
    useProfitStore();

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage saved scenarios, reset data, and configure ProfitOS."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Saved Scenarios</CardTitle>
            <Button variant="outline" size="sm" onClick={resetToDefaults}>
              <RotateCcw className="h-4 w-4" />
              Reset Defaults
            </Button>
          </CardHeader>
          <CardContent>
            {scenarios.length === 0 ? (
              <EmptyState
                icon={FolderOpen}
                title="No scenarios saved"
                description="Save scenarios from the Profit Calculator to compare different business models."
              />
            ) : (
              <div className="space-y-2">
                {scenarios.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <div>
                      <p className="font-medium text-zinc-200">{s.name}</p>
                      <p className="text-xs text-zinc-500">
                        {new Date(s.createdAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => loadScenario(s.id)}
                      >
                        Load
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteScenario(s.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-zinc-400">
            <p>
              All data is stored locally in your browser via LocalStorage. No data
              is sent to external servers.
            </p>
            <p>
              Storage key: <code className="text-indigo-400">profitos-storage</code>
            </p>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("Clear all ProfitOS data?")) {
                  localStorage.removeItem("profitos-storage");
                  window.location.reload();
                }
              }}
            >
              Clear All Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
