import SiteSetting from '../models/SiteSetting.js';

export async function getSettings(req, res) {
  try {
    const settings = await SiteSetting.findAll();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateSetting(req, res) {
  try {
    const { setting_key, setting_value } = req.body;
    if (!setting_key || setting_value === undefined) {
      return res.status(400).json({ error: 'setting_key and setting_value are required' });
    }
    const setting = await SiteSetting.update(setting_key, setting_value);
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
