import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserType, setNewUserType] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const updateUserType = async () => {
    if (!selectedUser || !newUserType) return;

    try {
      await axios.put('/api/userType', { userId: selectedUser._id, userType: newUserType });
      setUsers(users.map(user => user._id === selectedUser._id ? { ...user, userType: newUserType } : user));
      setSelectedUser(null);
      setNewUserType('');
    } catch (error) {
      console.error('Error updating userType', error);
    }
  };

  return (
    <Container style={{ direction: 'rtl' }}>
      <Typography variant="h4" gutterBottom>إدارة المستخدمين</Typography>
      <List>
        {users.map(user => (
          <ListItem key={user._id} divider>
            <ListItemText primary={`${user.username} - ${user.userType}`} />
            <Button variant="contained" color="primary" onClick={() => setSelectedUser(user)} style={{ marginLeft: 'auto' }}>تحرير</Button>
          </ListItem>
        ))}
      </List>
      {selectedUser && (
        <Box mt={4}>
          <Typography variant="h6">تحرير نوع المستخدم لـ {selectedUser.username}</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>نوع المستخدم</InputLabel>
            <Select
              value={newUserType}
              onChange={(e) => setNewUserType(e.target.value)}
            >
              <MenuItem value="product_manager">مدير المنتجات</MenuItem>
              <MenuItem value="billing_manager">مدير الفواتير</MenuItem>
              <MenuItem value="admin">مدير النظام</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="secondary"
            onClick={updateUserType}
          >
            تحديث نوع المستخدم
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ManageUsers;
