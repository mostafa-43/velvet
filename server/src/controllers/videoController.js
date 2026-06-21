import Video from '../models/Video.js';

export async function getVideos(req, res) {
  try {
    const videos = await Video.findAll();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getVideo(req, res) {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createVideo(req, res) {
  try {
    const video = await Video.create(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateVideo(req, res) {
  try {
    const existing = await Video.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Video not found' });
    const video = await Video.update(req.params.id, req.body);
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteVideo(req, res) {
  try {
    const existing = await Video.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Video not found' });
    await Video.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
