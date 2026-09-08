import api from "./axios";
import type {
  ApiResponse,
  ChangePasswordPayload,
  CommentPayload,
  JsonPayload,
  LoginPayload,
  PlaylistPayload,
  UpdateAccountPayload,
  UserChannelProfile,
  UserResponse,
} from "./types";

export async function healthcheck() {
  const response = await api.get("/healthcheck");
  return response.data;
}

// User routes
export async function getMyself(): Promise<UserResponse> {
  const response = await api.get<ApiResponse<UserResponse>>(
    "/users/current-user",
  );
  return response.data.data;
}
export async function register(payload: FormData) {
  const response = await api.post("/users/register", payload);
  return response.data;
}

export async function login(payload: LoginPayload) {
  const response = await api.post("/users/login", payload);
  return response.data;
}

export async function logout() {
  const response = await api.post("/users/logout");
  return response.data;
}

export async function refreshToken(payload?: JsonPayload) {
  const response = await api.post("/users/refresh-token", payload);
  return response.data;
}

export async function changePassword(payload: ChangePasswordPayload) {
  const response = await api.post("/users/change-password", payload);
  return response.data;
}

export async function currentUser() {
  const response = await api.get("/users/current-user");
  return response.data;
}

export async function updateAccount(payload: UpdateAccountPayload) {
  const response = await api.patch("/users/update-account", payload);
  return response.data;
}

export async function avatar(payload: FormData) {
  const response = await api.patch("/users/avatar", payload);
  return response.data;
}

export async function coverImage(payload: FormData) {
  const response = await api.patch("/users/cover-image", payload);
  return response.data;
}

export async function username(username: string) {
  const response = await api.get(`/users/c/${encodeURIComponent(username)}`);
  return response.data;
}

export async function getUserChannel(
  username: string,
): Promise<ApiResponse<UserChannelProfile>> {
  const response = await api.get<ApiResponse<UserChannelProfile>>(
    `/users/c/${encodeURIComponent(username)}`,
  );
  return response.data;
}

export async function history() {
  const response = await api.get("/users/history");
  return response.data;
}

// Video routes
export async function getAllVideo(
  pagination: {
    page?: number;
    limit?: number;
    sort?: string;
  }
) {
  const response = await api.get("/videos", {
    params: pagination,
  });
  return response.data;
}

export async function uploadNewVideo(payload: FormData) {
  const response = await api.post("/videos", payload);
  return response.data;
}

export async function getVideoByID(videoId: string) {
  const response = await api.get(`/videos/${videoId}`);
  return response.data;
}

export async function updateVideoDetails(videoId: string, payload: FormData) {
  const response = await api.patch(`/videos/${videoId}`, payload);
  return response.data;
}

export async function deleteVideo(videoId: string) {
  const response = await api.delete(`/videos/${videoId}`);
  return response.data;
}

export async function toggleVideoPublishStatus(videoId: string) {
  const response = await api.patch(`/videos/toggle/publish/${videoId}`);
  return response.data;
}

// Comment routes
export async function getAllCommentsVideo(videoId: string) {
  const response = await api.get(`/comments/${videoId}`);
  return response.data;
}

export async function addCommentVideo(
  videoId: string,
  payload: CommentPayload,
) {
  const response = await api.post(`/comments/${videoId}`, payload);
  return response.data;
}

export async function updateComment(
  commentId: string,
  payload: CommentPayload,
) {
  const response = await api.patch(`/comments/c/${commentId}`, payload);
  return response.data;
}

export async function deleteComment(commentId: string) {
  const response = await api.delete(`/comments/c/${commentId}`);
  return response.data;
}

// Like routes
export async function toggleLikeVideo(videoId: string) {
  const response = await api.post(`/likes/toggle/v/${videoId}`);
  return response.data;
}

export async function toggleLikeCcomment(commentId: string) {
  const response = await api.post(`/likes/toggle/c/${commentId}`);
  return response.data;
}

export async function getAllLikedVideos() {
  const response = await api.get("/likes/videos");
  return response.data;
}

// Subscription routes
export async function toggleSubscriptionChannel(channelId: string) {
  const response = await api.post(`/subscriptions/c/${channelId}`);
  return response.data;
}

export async function getSubscribedChannels(channelId: string) {
  const response = await api.get(`/subscriptions/c/${channelId}`);
  return response.data;
}

export async function getChannelSubscribers(subscriberId: string) {
  const response = await api.get(`/subscriptions/u/${subscriberId}`);
  return response.data;
}

// Playlist routes
export async function createNewPlaylist(payload: PlaylistPayload) {
  const response = await api.post("/playlists", payload);
  return response.data;
}

export async function getPlaylistID(playlistId: string) {
  const response = await api.get(`/playlists/${playlistId}`);
  return response.data;
}

export async function updatePlaylist(
  playlistId: string,
  payload: PlaylistPayload,
) {
  const response = await api.patch(`/playlists/${playlistId}`, payload);
  return response.data;
}

export async function deletePlaylist(playlistId: string) {
  const response = await api.delete(`/playlists/${playlistId}`);
  return response.data;
}

export async function addVideoPlaylist(videoId: string, playlistId: string) {
  const response = await api.patch(`/playlists/add/${videoId}/${playlistId}`);
  return response.data;
}

export async function removeVideoPlaylist(videoId: string, playlistId: string) {
  const response = await api.patch(
    `/playlists/remove/${videoId}/${playlistId}`,
  );
  return response.data;
}

export async function getUserPlaylists(userId: string) {
  const response = await api.get(`/playlists/user/${userId}`);
  return response.data;
}

// Dashboard routes
export async function getChannelStatistics() {
  const response = await api.get("/dashboard/stats");
  return response.data;
}

export async function getAllChannelVideos() {
  const response = await api.get("/dashboard/videos");
  return response.data;
}
