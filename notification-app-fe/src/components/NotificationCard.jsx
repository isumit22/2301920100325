import {
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import VisibilityIcon from "@mui/icons-material/Visibility";

function formatTimestamp(value) {
  if (!value) {
    return "";
  }

  return new Date(value.replace(" ", "T")).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function NotificationCard({ notification, viewed = false, onMarkViewed }) {
  const theme = useTheme();

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        borderColor: viewed ? "divider" : alpha(theme.palette.primary.main, 0.5),
        background: viewed
          ? "background.paper"
          : `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.08,
            )}, ${alpha(theme.palette.success.main, 0.04)})`,
        boxShadow: viewed
          ? "0 1px 2px rgba(15, 23, 42, 0.04)"
          : "0 10px 24px rgba(31, 95, 139, 0.12)",
        transition: "border-color 160ms ease, box-shadow 160ms ease",
        "&:hover": {
          borderColor: viewed ? "text.secondary" : "primary.main",
          boxShadow: "0 14px 30px rgba(15, 23, 42, 0.12)",
        },
      }}
    >
      <Stack spacing={1.25}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={1}
        >
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              label={notification.Type}
              size="small"
              color="primary"
              sx={{ fontWeight: 700 }}
            />
            <Chip
              label={viewed ? "Viewed" : "New"}
              size="small"
              color={viewed ? "default" : "success"}
              variant={viewed ? "outlined" : "filled"}
              sx={{ fontWeight: 700 }}
            />
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ pt: 0.5 }}>
            {formatTimestamp(notification.Timestamp)}
          </Typography>
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="space-between"
          spacing={1.5}
        >
          <Typography variant="body1" fontWeight={700}>
            {notification.Message}
          </Typography>
          <Button
            variant={viewed ? "outlined" : "contained"}
            size="small"
            startIcon={viewed ? <DoneIcon /> : <VisibilityIcon />}
            onClick={() => onMarkViewed?.(notification.ID)}
            disabled={viewed}
            sx={{
              alignSelf: { xs: "flex-start", sm: "center" },
              whiteSpace: "nowrap",
            }}
          >
            {viewed ? "Seen" : "Mark viewed"}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
