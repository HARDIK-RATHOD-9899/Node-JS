import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Forgotpassword from './Forgotpassword';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      paper: '#1e1e1e',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#404040',
            },
            '&:hover fieldset': {
              borderColor: '#90caf9',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        },
      },
    },
  },
});

const PasswordChangeForm = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/changepassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} color="primary">
        Change Password
      </Button>
      <ThemeProvider theme={darkTheme}>
        <Dialog 
          open={open} 
          onClose={() => setOpen(false)} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            style: {
              borderRadius: '12px',
            },
          }}
        >
          <DialogTitle sx={{ 
            textAlign: 'center', 
            fontSize: '1.5rem',
            color: '#fff',
            borderBottom: '1px solid #404040'
          }}>
            Change Password
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: '#1e1e1e' }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  required
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Current Password"
                  name="oldPassword"
                  type="password"
                  required
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type="password"
                  required
                  variant="outlined"
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  required
                  variant="outlined"
                  onChange={handleChange}
                />
                <Button 
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ 
                    mt: 2,
                    backgroundColor: '#90caf9',
                    '&:hover': {
                      backgroundColor: '#6b9dc7'
                    }
                  }}
                >
                  Update Password
                </Button>
              </Stack>
            </Box>
            <Forgotpassword/>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default PasswordChangeForm;