import { useMemo, useState } from "react";
import {
  Box,
  Divider,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import { NotificationFilter } from "../components/NotificationFilter";
import { NotificationList } from "../components/NotificationList";
import { useNotifications } from "../hooks/useNotifications";
import { useViewedNotifications } from "../hooks/useViewedNotifications";

const priorityLimitOptions = [5, 10, 15];

function byNewest(left, right) {
  return (
    new Date(right.Timestamp.replace(" ", "T")) -
    new Date(left.Timestamp.replace(" ", "T"))
  );
}

export function PriorityNotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const viewed = useViewedNotifications();

  const { notifications, hasNextPage, loading, error } = useNotifications({
    filter,
    page,
    limit,
  });

  const priorityNotifications = useMemo(
    () => [...notifications].sort(byNewest),
    [notifications],
  );

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
          }}
        >
          <PriorityHighIcon sx={{ fontSize: 28 }} />
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={800}>
            Priority Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review the newest limited set first.
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
          justifyContent="space-between"
        >
          <NotificationFilter
            value={filter}
            onChange={(newFilter) => {
              setFilter(newFilter ?? "All");
              setPage(1);
            }}
          />
          <TextField
            select
            label="Top notifications"
            size="small"
            value={limit}
            onChange={(event) => {
              setLimit(Number(event.target.value));
              setPage(1);
            }}
            sx={{ minWidth: 190 }}
          >
            {priorityLimitOptions.map((option) => (
              <MenuItem key={option} value={option}>
                Top {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      <NotificationList
        notifications={priorityNotifications}
        loading={loading}
        error={error}
        page={page}
        hasNextPage={hasNextPage}
        viewedIds={viewed.viewedIds}
        onMarkViewed={viewed.markViewed}
        onPageChange={setPage}
      />
    </Box>
  );
}
