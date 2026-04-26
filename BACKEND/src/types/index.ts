export interface IUser {
  name: string;
  email: string;
  password: string;
  githubId?: string;
  githubUsername?: string;
  githubToken?: string;
  avatar?: string;
  createdAt: Date;
}

export interface IRepository {
  userId: string;
  name: string;
  owner: string;
  fullName: string;
  description?: string;
  url: string;
  createdAt: Date;
}

export interface ICommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

export interface IPullRequest {
  id: number;
  title: string;
  state: string;
  author: string;
  url: string;
  createdAt: string;
}

export interface IIssue {
  id: number;
  title: string;
  state: string;
  author: string;
  url: string;
  createdAt: string;
}

export interface IDashboardData {
  commits: ICommit[];
  pullRequests: IPullRequest[];
  issues: IIssue[];
  contributors: string[];
  totalCommits: number;
  openPRs: number;
  openIssues: number;
}
export interface IUser {
  name: string;
  email: string;
  password: string;
  githubId?: string;
  githubUsername?: string;
  githubToken?: string;
  avatar?: string;
  accountType: "individual" | "team";
  createdAt: Date;
}

export interface ITeam {
  name: string;
  ownerId: string;
  members: string[];
  repos: string[];
  inviteCode: string;
  createdAt: Date;
}

export interface IRepository {
  userId: string;
  teamId?: string;
  name: string;
  owner: string;
  fullName: string;
  description?: string;
  url: string;
  githubId: number;
  createdAt: Date;
}

export interface ICommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

export interface IPullRequest {
  id: number;
  title: string;
  state: string;
  author: string;
  url: string;
  createdAt: string;
}

export interface IIssue {
  id: number;
  title: string;
  state: string;
  author: string;
  url: string;
  createdAt: string;
}

export interface IDashboardData {
  repo: { name: string; fullName: string; url: string };
  commits: ICommit[];
  pullRequests: IPullRequest[];
  issues: IIssue[];
  contributors: Contributor[];
  stats: {
    totalCommits: number;
    openPRs: number;
    openIssues: number;
    contributors: number;
  };
}

export interface Contributor {
  username: string;
  avatar: string;
  contributions: number;
}

export interface AuthRequest extends Request {
  user?: IUser;
}
