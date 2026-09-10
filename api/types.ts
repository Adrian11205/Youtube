export type JsonPayload = Record<string, unknown>;

export type LoginPayload = {
  email: string;
  password: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  errors: unknown[];
  data: T;
};

export type UserResponse = {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  avatar?: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
};

export type UserChannelProfile = {
  _id: string;
  username: string;
  fullname: string;
  avatar?: string;
  coverImage?: string;
  subscribersCount: number;
  channelsSubscribedToCount: number;
  isSubscribed: boolean;
  email?: string;
  createdAt: string;
  owner: number;
};

export type RegisterPayload = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export type UpdateAccountPayload = {
  fullname: string;
  email: string;
};

export type CommentPayload = {
  content: string;
};

export type CommentResponse = {
  _id: string;
  content: string;
  video: string;
  owner: string;
  ownerDetails?: {
    fullname: string;
    username: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CommentsPaginationResponse = {
  docs: CommentResponse[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type PlaylistPayload = {
  name: string;
  description?: string;
};

export type VideoInfo = {
  _id: string;
  likeCount?: number;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration?: number;
  views: number;
  isPublished: boolean;
  owner: string;
  ownerDetails?: {
    avatar?: string;
    username: string;
    fullname: string;
  };
  createdAt: string;
  updatedAt: string;
};
