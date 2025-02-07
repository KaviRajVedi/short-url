export interface ShortUrl {
    short: string;
    original: string;
  }
  
  export interface UserData {
    username: string;
    password: string;
    urls: ShortUrl[];
  }
  
  const STORAGE_KEY = 'url_shortener_users';
  const LOGGED_IN_KEY = 'url_shortener_logged_in';
  
  // Retrieve all users from localStorage (simulate file read)
  export const getAllUsers = (): UserData[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };
  
  // Save all users to localStorage (simulate file write)
  const saveAllUsers = (users: UserData[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  };
  
  export const registerUser = (username: string, password: string): boolean => {
    const users = getAllUsers();
    if (users.find((user) => user.username === username)) {
      return false; // user exists
    }
    users.push({ username, password, urls: [] });
    saveAllUsers(users);
    localStorage.setItem(LOGGED_IN_KEY, username);
    return true;
  };
  
  export const loginUser = (username: string, password: string): boolean => {
    const users = getAllUsers();
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem(LOGGED_IN_KEY, username);
      return true;
    }
    return false;
  };
  
  export const logout = () => {
    localStorage.removeItem(LOGGED_IN_KEY);
  };
  
  export const getLoggedInUser = (): string | null => {
    return localStorage.getItem(LOGGED_IN_KEY);
  };
  
  export const getUserUrls = (username: string): ShortUrl[] => {
    const users = getAllUsers();
    const user = users.find((u) => u.username === username);
    return user ? user.urls : [];
  };
  
  export const addUrlToUser = (username: string, url: ShortUrl): boolean => {
    const users = getAllUsers();
    const userIndex = users.findIndex((u) => u.username === username);
    if (userIndex === -1) return false;
    if (users[userIndex].urls.length >= 10) return false; // max limit reached
    users[userIndex].urls.push(url);
    saveAllUsers(users);
    return true;
  };
  