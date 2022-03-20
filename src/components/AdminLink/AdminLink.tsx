import React from 'react';
import {
  Link
} from 'react-router-dom';

import './AdminLink.scss'

export const AdminLink = () => {
  return (
    <Link className="admin-link" to="/admin" >Admin Panel</Link>
  );
};
