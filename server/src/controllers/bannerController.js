import Banner from '../models/Banner.js';

export async function getBanners(req, res) {
  try {
    const activeOnly = req.query.active === 'true';
    const banners = await Banner.findAll(activeOnly);
    res.json(banners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getBanner(req, res) {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ error: 'Banner not found' });
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createBanner(req, res) {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateBanner(req, res) {
  try {
    const existing = await Banner.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Banner not found' });
    const banner = await Banner.update(req.params.id, req.body);
    res.json(banner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteBanner(req, res) {
  try {
    const existing = await Banner.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Banner not found' });
    await Banner.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
