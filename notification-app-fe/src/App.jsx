import { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import { NotificationsPage } from "./pages/NotificationsPage";
import { PriorityNotificationsPage } from "./pages/PriorityNotificationsPage";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1f5f8b",
    },
    secondary: {
      main: "#8a5a14",
    },
    success: {
      main: "#2e7d32",
    },
    background: {
      default: "#f5f7f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#18212b",
      secondary: "#647282",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial, sans-serif',
    h5: {
      letterSpacing: 0,
    },
    h6: {
      letterSpacing: 0,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 44,
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
  },
});

export default function App() {
  const [page, setPage] = useState("all");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Toolbar
          sx={{
            gap: 2,
            minHeight: { xs: 64, sm: 72 },
            flexWrap: { xs: "wrap", sm: "nowrap" },
            py: { xs: 1, sm: 0 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              width: 40,
              height: 40,
              display: "grid",
              placeItems: "center",
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <NotificationsActiveIcon />
          </Paper>
          <Box sx={{ flexGrow: 1, minWidth: 180 }}>
            <Typography variant="h6" component="h1" fontWeight={800}>
              Campus Notifications
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Live updates, filtered and tracked
            </Typography>
          </Box>
          <Tabs
            value={page}
            onChange={(_, nextPage) => setPage(nextPage)}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              minHeight: 44,
              "& .MuiTabs-flexContainer": { gap: 0.5 },
            }}
          >
            <Tab value="all" label="All" />
            <Tab value="priority" label="Priority" />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 4 } }}>
        <Box component="main">
          {page === "all" ? <NotificationsPage /> : <PriorityNotificationsPage />}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
