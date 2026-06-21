import Product from '../models/Product.js';
import ProductImage from '../models/ProductImage.js';

function enrichProduct(p) {
  if (!p) return p;
  if (typeof p.features === 'string') {
    try { p.features = JSON.parse(p.features); } catch { p.features = []; }
  }
  if (!p.features || !Array.isArray(p.features)) p.features = [];
  return p;
}

function enrichProductList(products) {
  return products.map(enrichProduct);
}

async function getProducts(req, res) {
  try {
    const filters = {};

    if (req.query.search) filters.search = req.query.search;
    if (req.query.brandId) filters.brandId = req.query.brandId;
    if (req.query.categoryId) filters.categoryId = req.query.categoryId;
    if (req.query.sort) filters.sortBy = req.query.sort;
    if (req.query.page) filters.page = parseInt(req.query.page);
    if (req.query.limit) filters.limit = parseInt(req.query.limit);

    if (req.query.filter) {
      switch (req.query.filter) {
        case 'new': filters.isNew = true; break;
        case 'trending': filters.isTrending = true; break;
        case 'featured': filters.isFeatured = true; break;
        case 'sale': filters.hasOriginalPrice = true; break;
      }
    }

    const result = await Product.findAll(filters);
    result.products = enrichProductList(result.products);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    enrichProduct(product);
    const images = await ProductImage.findByProductId(product.id);
    product.images = images.map(img => img.imageUrl);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    await Product.updateCounts();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const existing = await Product.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Product not found' });
    const product = await Product.update(req.params.id, req.body);
    await Product.updateCounts();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const existing = await Product.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Product not found' });
    await Product.remove(req.params.id);
    await Product.updateCounts();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
