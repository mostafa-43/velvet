import HomepageSection from '../models/HomepageSection.js';

export async function getSections(req, res) {
  try {
    const sections = await HomepageSection.findAll();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateSection(req, res) {
  try {
    const existing = await HomepageSection.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Section not found' });
    const section = await HomepageSection.update(req.params.id, req.body);
    res.json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
