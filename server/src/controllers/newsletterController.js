import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

export async function subscribe(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const existing = await NewsletterSubscriber.findByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    const subscriber = await NewsletterSubscriber.create(email);
    res.status(201).json(subscriber);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getSubscribers(req, res) {
  try {
    const subscribers = await NewsletterSubscriber.findAll();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
