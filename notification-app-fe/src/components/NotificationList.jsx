import {
  Alert,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { NotificationCard } from "./NotificationCard";

export function NotificationList({
  notifications,
  loading,
  error,
  page,
  hasNextPage,
  viewedIds,
  onMarkViewed,
  onPageChange,
}) {
  if (loading) {
    return (
      <Paper
        variant="outlined"
        sx={{ display: "flex", justifyContent: "center", py: 7, borderRadius: 2 }}
      >
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ borderRadius: 2 }}>
        Failed to load notifications: {error}
      </Alert>
    );
  }

  if (notifications.length === 0) {
    return (
      <Alert severity="info" sx={{ borderRadius: 2 }}>
        No notifications found.
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      <Stack spacing={1.5}>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.ID}
            notification={notification}
            viewed={viewedIds.has(notification.ID)}
            onMarkViewed={onMarkViewed}
          />
        ))}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          px: 2,
          py: 1.5,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<NavigateBeforeIcon />}
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Typography variant="body2" color="text.secondary">
          Page {page}
        </Typography>
        <Button
          variant="outlined"
          endIcon={<NavigateNextIcon />}
          disabled={!hasNextPage}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
}
