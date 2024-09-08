import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LocalizationTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Language Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Manage Supported Languages</h3>
          <p className="mb-4">Add, remove, or update supported languages for the platform.</p>
          <Button>Edit Language Settings</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Translation Management</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Update Translations</h3>
          <p className="mb-4">Edit and manage translations for all supported languages.</p>
          <Button>Manage Translations</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Localization Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Preview Localized Content</h3>
          <p className="mb-4">Test and preview how content appears in different languages.</p>
          <Button>Open Preview Tool</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalizationTab;