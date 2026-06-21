import ContactMessage from '../models/ContactMessage.js';

export async function submitContact(req, res) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    const contact = await ContactMessage.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMessages(req, res) {
  try {
    const messages = await ContactMessage.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getMessage(req, res) {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteMessage(req, res) {
  try {
    const existing = await ContactMessage.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Message not found' });
    await ContactMessage.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
