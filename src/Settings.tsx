import { Box, TextField, Typography } from "@mui/material";
import { getSettings } from "k3-plugin-api";

type SettingsProps = {
  settings: unknown;
  onSave: (settings: unknown) => void;
};

export const Settings = ({ settings, onSave }: SettingsProps) => {
  const currentSettings = settings as Record<string, unknown>;
  const apiSettings = getSettings("sample.ring-plugin") as Record<
    string,
    unknown
  >;

  const handleTextChange = (newText: string) => {
    onSave({ ...currentSettings, text: newText });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1">
        Here you can add settings for your plugin.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        getSettings() text: {(apiSettings.text as string) || "(empty)"}
      </Typography>
      <TextField
        label="Text"
        value={(currentSettings.text as string) || ""}
        onChange={(e) => handleTextChange(e.target.value)}
        fullWidth
        multiline
        rows={3}
      />
    </Box>
  );
};
