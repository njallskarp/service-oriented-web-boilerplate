interface IAuthProvider {
  getAuthUrl(): string;
  getToken(code: string): Promise<any>;
  getUserProfile(accessToken: string): Promise<IUserProfile>;
}

interface IUserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}
