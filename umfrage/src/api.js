import axios from 'axios';


export default {
  user: {
    login: credentials =>
      axios.post('https://localhost:8443/api/auth', { credentials }).then(res => res.data.user),
  }
}
