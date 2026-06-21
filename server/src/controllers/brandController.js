import Brand from '../models/Brand.js';

export async function getBrands(req, res) {
  try {
    const { featured } = req.query;
    let brands;
    if (featured === 'true') {
      brands = await Brand.findFeatured();
    } else if (featured === 'false') {
      const all = await Brand.findAll();
      brands = all.filter(b => !b.featured);
    } else {
      brands = await Brand.findAll();
    }
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getBrand(req, res) {
  try {
    const brand = await Brand.findBySlug(req.params.slug);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getBrandById(req, res) {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });
    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createBrand(req, res) {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateBrand(req, res) {
  try {
    const existing = await Brand.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Brand not found' });
    const brand = await Brand.update(req.params.id, req.body);
    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteBrand(req, res) {
  try {
    const existing = await Brand.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Brand not found' });
    await Brand.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
