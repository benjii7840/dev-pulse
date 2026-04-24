export interface User {
  _id: string;
  name: string;
  email: string;
  githubUsername?: string;
  avatar?: string;
}

export interface Repo {
  _id: string;
  name: string;
  owner: string;
  fullName: string;
  description?: string;
  url: string;
  createdAt: string;
}

export interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

export interface PullRequest {
  id: number;
  title: string;
  state: string;
  author: string;
  url: string;
  createdAt: string;
}

export interface Issue {
  id: number;
  title: string;
  state: string;
  author: string;
  url: string;
  createdAt: string;
}

export interface Contributor {
  username: string;
  avatar: string;
  contributions: number;
}

export interface DashboardData {
  repo: { name: string; fullName: string; url: string };
  commits: Commit[];
  pullRequests: PullRequest[];
  issues: Issue[];
  contributors: Contributor[];
  stats: {
    totalCommits: number;
    openPRs: number;
    openIssues: number;
    contributors: number;
  };
}
