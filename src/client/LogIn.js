import { User} from './DataStructures.js';

let user = new User;

class AuthService {
    static async authenticate(username, password) {
        return new Promise((resolve, reject) => {
        
            setTimeout(() => {
                user = users.find(user => user.email === username && user.password === password);
                if (user) {
                    resolve(user); 
                } else {
                    reject(new Error('Invalid username or password'));
                }
            });
        });
    }
}

async function login(username, password) {
    try {
        const user = await AuthService.authenticate(username, password);
        console.log('Authentication successful:', user);
        //Change window
        window.location.href = 'DiscoverHousing.js'; 
    } catch (error) {
        console.error('Authentication failed:', error.message);
    }
}
