import axios from 'axios';
import {backendUrl} from './App.js';

export default {
  user: {
    login: credentials =>
      axios.post(backendUrl + '/api/auth', { credentials }).then(res => res.data.user),
  }
}
