import { api } from './api';
import { videos as mockVideos } from '../data/mockData';

async function safeRequest(promise, fallback) {
  try {
    return await promise;
  } catch {
    return fallback;
  }
}

export const videoService = {
  getAll: (signal) => safeRequest(api.get('/videos', signal), mockVideos),
};
