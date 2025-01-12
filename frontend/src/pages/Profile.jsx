import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); // Simulated loading state
  const [saving, setSaving] = useState(false); // Simulated saving state
  const [userDetails, setUserDetails] = useState({
    avatar: "",
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "This is a sample bio.",
  });
  const [error, setError] = useState("");

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setError("");

    // Simulate saving data with a timeout
    setTimeout(() => {
      setSaving(false);
      setIsEditing(false);
    }, 2000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #2575fc, #6a11cb)",
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 3,
            boxShadow: 3,
            width: "100%",
            maxWidth: "600px",
            padding: 4,
            textAlign: "center",
          }}
        >
          {/* Profile Avatar */}
          <Avatar
            src={userDetails.avatar || "https://via.placeholder.com/150"}
            sx={{
              width: 100,
              height: 100,
              margin: "0 auto",
              marginBottom: 3,
              boxShadow: 2,
            }}
          />

          {/* User Information */}
          {isEditing ? (
            <>
              <TextField
                label="Name"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Avatar URL"
                name="avatar"
                value={userDetails.avatar}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Email"
                name="email"
                value={userDetails.email}
                variant="outlined"
                fullWidth
                disabled // Email cannot be changed
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Bio"
                name="bio"
                value={userDetails.bio}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                sx={{ marginBottom: 2 }}
              />
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {userDetails.name || "N/A"}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {userDetails.email || "N/A"}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginBottom: 2 }}
              >
                {userDetails.bio || "No bio available."}
              </Typography>
            </>
          )}

          <Divider sx={{ marginY: 3 }} />

          {/* Action Buttons */}
          {isEditing ? (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleEditToggle}
                disabled={saving}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditToggle}
              sx={{
                backgroundColor: "#6a11cb",
                "&:hover": { backgroundColor: "#2575fc" },
              }}
            >
              Edit Profile
            </Button>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
