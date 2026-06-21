USE velvet_kids;

-- Seed Brands
INSERT INTO brands (id, name, slug, tagline, description, color, bg_color, logo, hero_image, product_count, featured) VALUES
('b1', 'BrickWorld', 'brickworld', 'Build Your Imagination', 'Premium building block sets that inspire creativity in children of all ages. From starter kits to master builder collections.', '#2255cc', '#dbeafe', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=200&h=200&fit=crop&auto=format', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1400&h=700&fit=crop&auto=format', 48, 1),
('b2', 'StarDolls', 'stardolls', 'Dream. Dress. Play.', 'Fashion-forward dolls and accessories that celebrate creativity, diversity, and self-expression.', '#8a5dca', '#f3e8ff', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop&auto=format', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1400&h=700&fit=crop&auto=format', 36, 1),
('b3', 'TurboRace', 'turborace', 'Speed. Thrills. Victory.', 'High-performance RC cars, trucks, and drones for kids who love the thrill of speed.', '#0a9c8e', '#ccfbf1', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=700&fit=crop&auto=format', 29, 1),
('b4', 'HeroForce', 'heroforce', 'Unleash Your Inner Hero', 'Epic action figures and playsets from your favorite superhero universes.', '#e8174b', '#fee2e2', 'https://images.unsplash.com/photo-1608889825271-9696283c3ea0?w=200&h=200&fit=crop&auto=format', 'https://images.unsplash.com/photo-1608889825271-9696283c3ea0?w=1400&h=700&fit=crop&auto=format', 52, 1),
('b5', 'ColorSplash', 'colorsplash', 'Every Color, Every Child', 'Award-winning arts & crafts kits that spark creativity and develop fine motor skills.', '#f5a623', '#fef3c7', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop&auto=format', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1400&h=700&fit=crop&auto=format', 41, 0),
('b6', 'MiniWorld', 'miniworld', 'Big Adventures, Tiny Scale', 'Collectible miniature figures and sets that create entire worlds in your hands.', '#ec4899', '#fce7f3', 'https://images.unsplash.com/photo-1620503374956-c942862f0372?w=200&h=200&fit=crop&auto=format', 'https://images.unsplash.com/photo-1620503374956-c942862f0372?w=1400&h=700&fit=crop&auto=format', 67, 1),
('b7', 'SplashZone', 'splashzone', 'Make a Splash', 'Premium water toys and outdoor play equipment for endless summer fun.', '#0ea5e9', '#e0f2fe', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&h=200&fit=crop&auto=format', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&h=700&fit=crop&auto=format', 23, 0),
('b8', 'RoboKids', 'robokids', 'The Future of Play', 'Educational robotics and STEM kits that teach coding, engineering, and problem solving.', '#6366f1', '#e0e7ff', 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=200&h=200&fit=crop&auto=format', 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1400&h=700&fit=crop&auto=format', 31, 0);

-- Seed Categories
INSERT INTO categories (id, name, slug, icon, color, product_count) VALUES
('cat1', 'Action Figures', 'action-figures', '🦸', '#e8174b', 124),
('cat2', 'Dolls & Fashion', 'dolls', '👗', '#8a5dca', 98),
('cat3', 'Building Sets', 'building-sets', '🏗️', '#2255cc', 87),
('cat4', 'RC Vehicles', 'rc-vehicles', '🚗', '#0a9c8e', 63),
('cat5', 'Arts & Crafts', 'arts-crafts', '🎨', '#f5a623', 75),
('cat6', 'Outdoor Play', 'outdoor-play', '🌳', '#22c55e', 52),
('cat7', 'Board Games', 'board-games', '🎲', '#f97316', 44),
('cat8', 'Science & STEM', 'stem', '🔬', '#0ea5e9', 38);

-- Seed Products
INSERT INTO products (id, name, brand_id, category_id, price, original_price, description, features, age_range, rating, review_count, is_new, is_trending, is_featured, video_url, in_stock) VALUES
('p1', 'BrickWorld City Mega Set', 'b1', 'cat3', 89.99, 119.99, 'Build a complete city with over 2,000 premium building pieces. Includes city hall, fire station, shopping mall, and 12 minifigures.', '["2,000+ premium bricks","12 minifigures included","Compatible with all major brands","Ages 8+","LED lighting kit compatible"]', '8-14', 4.8, 342, 0, 1, 1, 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1),
('p2', 'StarDolls Fashion House', 'b2', 'cat2', 49.99, 64.99, 'A complete fashion studio with 3 poseable dolls, 20+ outfits, and a full runway setup. Design your own looks!', '["3 poseable dolls","20+ mix-and-match outfits","Runway set included","Accessories kit","Ages 4+"]', '4-10', 4.7, 218, 1, 1, 1, NULL, 1),
('p3', 'TurboRace Max Pro 4WD', 'b3', 'cat4', 129.99, NULL, 'Pro-grade 4WD RC car with 40km/h top speed, full suspension, and waterproof electronics. Race on any terrain.', '["40km/h top speed","4-wheel drive","Waterproof electronics","60min battery life","2.4GHz remote"]', '8+', 4.9, 487, 0, 1, 1, NULL, 1),
('p4', 'HeroForce Ultimate Titan', 'b4', 'cat1', 34.99, 44.99, 'The 12-inch ultimate titan action figure with 32 points of articulation, light-up chest armor, and battle sounds.', '["32 points of articulation","Light-up armor","Battle sound effects","10 accessories included","Ages 4+"]', '4-12', 4.6, 156, 0, 0, 1, NULL, 1),
('p5', 'ColorSplash Rainbow Kit Pro', 'b5', 'cat5', 39.99, NULL, 'Complete art studio kit with 200+ non-toxic supplies. Includes paints, brushes, canvases, and step-by-step project guides.', '["200+ art supplies","Non-toxic & washable","25 project guides","Carrying case included","Ages 5+"]', '5-12', 4.5, 203, 1, 0, 0, NULL, 1),
('p6', 'MiniWorld Mystery Ball Series 5', 'b6', 'cat1', 14.99, NULL, 'Crack open the mystery ball to reveal one of 50 ultra-rare collectible mini figures. Collect them all!', '["50 figures to collect","5 ultra-rare figures","Series 5 exclusive","Collector checklist","Ages 3+"]', '3+', 4.7, 891, 1, 1, 1, NULL, 1),
('p7', 'SplashZone Mega Blaster X', 'b7', 'cat6', 29.99, 39.99, 'The ultimate water blaster with motorized pump, 1.5L tank, and 20-foot range. Perfect for backyard battles.', '["Motorized pump","1.5L water tank","20-foot range","Ergonomic grip","Ages 6+"]', '6+', 4.8, 324, 0, 1, 0, NULL, 1),
('p8', 'RoboKids Starter Bot', 'b8', 'cat8', 79.99, NULL, 'Build, program, and play with your own robot! Includes 150+ components and a free app with 30 coding challenges.', '["150+ components","Free coding app","30 challenges","Voice control","Ages 7+"]', '7-14', 4.9, 147, 1, 0, 1, NULL, 1),
('p9', 'BrickWorld Space Station', 'b1', 'cat3', 149.99, NULL, 'Blast off with the ultimate space station set! 3,200 pieces, 8 astronaut figures, and a working launch pad.', '["3,200 pieces","8 astronaut figures","Launch pad mechanism","Solar panels","Ages 10+"]', '10+', 4.9, 211, 1, 1, 1, NULL, 0),
('p10', 'HeroForce Battle Pack 6', 'b4', 'cat1', 59.99, 74.99, 'The complete HeroForce squad! 6 detailed action figures with weapons, vehicles, and battle base.', '["6 unique figures","Battle base included","2 vehicles","40 accessories","Ages 5+"]', '5-12', 4.7, 298, 0, 1, 0, NULL, 1),
('p11', 'StarDolls Princess Castle', 'b2', 'cat2', 79.99, 99.99, 'A magical 3-story castle with working elevator, light-up ballroom, and 2 exclusive princess dolls.', '["3-story castle","Working elevator","Light-up ballroom","2 exclusive dolls","Ages 3+"]', '3-10', 4.6, 175, 0, 0, 1, NULL, 1),
('p12', 'TurboRace Stunt Drone Pro', 'b3', 'cat4', 69.99, NULL, 'Perform aerial flips, rolls, and 360 spins with this pro-level stunt drone. HD camera included.', '["HD camera","Auto flip stunts","Altitude hold","15-min flight time","Ages 8+"]', '8+', 4.5, 234, 1, 0, 0, NULL, 1);

-- Seed Product Images
INSERT INTO product_images (id, product_id, image_url, sort_order) VALUES
('pi1', 'p1', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=800&fit=crop&auto=format', 0),
('pi2', 'p1', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&auto=format', 1),
('pi3', 'p1', 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=800&h=800&fit=crop&auto=format', 2),
('pi4', 'p2', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=800&fit=crop&auto=format', 0),
('pi5', 'p3', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&auto=format', 0),
('pi6', 'p4', 'https://images.unsplash.com/photo-1608889825271-9696283c3ea0?w=800&h=800&fit=crop&auto=format', 0),
('pi7', 'p5', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=800&fit=crop&auto=format', 0),
('pi8', 'p6', 'https://images.unsplash.com/photo-1620503374956-c942862f0372?w=800&h=800&fit=crop&auto=format', 0),
('pi9', 'p7', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop&auto=format', 0),
('pi10', 'p8', 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=800&fit=crop&auto=format', 0),
('pi11', 'p9', 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?w=800&h=800&fit=crop&auto=format', 0),
('pi12', 'p10', 'https://images.unsplash.com/photo-1608889825271-9696283c3ea0?w=800&h=800&fit=crop&auto=format', 0),
('pi13', 'p11', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=800&fit=crop&auto=format', 0),
('pi14', 'p12', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&auto=format', 0);

-- Seed Banners
INSERT INTO banners (id, title, subtitle, cta_text, cta_link, image, bg_color, text_color, sort_order, active) VALUES
('hero1', 'Summer of Play', 'The biggest outdoor toys collection is here. Splash, race, and adventure all summer long.', 'Shop Now', '/products', 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=1600&h=800&fit=crop&auto=format', '#0d1b4b', '#ffffff', 0, 1),
('hero2', 'Build. Create. Explore.', 'New BrickWorld City Mega Sets — 2,000+ pieces, endless possibilities.', 'Explore BrickWorld', '/brands/brickworld', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1600&h=800&fit=crop&auto=format', '#1e3a8a', '#ffffff', 1, 1),
('hero3', 'Collect Them All', 'MiniWorld Mystery Ball Series 5 — 50 rare figures, infinite surprises.', 'Start Collecting', '/brands/miniworld', 'https://images.unsplash.com/photo-1620503374956-c942862f0372?w=1600&h=800&fit=crop&auto=format', '#831843', '#ffffff', 2, 1);

-- Seed Videos
INSERT INTO videos (id, title, brand, thumbnail, duration, views, sort_order) VALUES
('v1', 'TurboRace Max Pro in Action', 'TurboRace', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format', '2:34', '1.2M', 0),
('v2', 'MiniWorld Series 5 Unboxing', 'MiniWorld', 'https://images.unsplash.com/photo-1620503374956-c942862f0372?w=600&h=400&fit=crop&auto=format', '4:12', '856K', 1),
('v3', 'BrickWorld City: Time-lapse Build', 'BrickWorld', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop&auto=format', '6:48', '2.1M', 2),
('v4', 'SplashZone Summer Battles', 'SplashZone', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&auto=format', '3:22', '445K', 3);

-- Seed Homepage Sections
INSERT INTO homepage_sections (id, name, description, enabled, sort_order) VALUES
('hs1', 'Hero Slider', '3 active slides', 1, 0),
('hs2', 'Category Strip', '8 categories shown', 1, 1),
('hs3', 'Featured Brands', '6 brands featured', 1, 2),
('hs4', 'Trending Products', '6 products shown', 1, 3),
('hs5', 'Brand Showcase', '3 full-bleed sections', 1, 4),
('hs6', 'Stats Banner', '4 key metrics', 1, 5),
('hs7', 'New Releases', '4 new products', 1, 6),
('hs8', 'Video Showcase', '4 videos', 1, 7),
('hs9', 'Newsletter Section', 'Email subscription form', 1, 8);

-- Seed Admin User (password: admin123)
INSERT INTO users (id, name, email, password, role) VALUES
('u1', 'Admin', 'admin@velvetkids.com', '$2b$10$8K1p/a0dL1LXMIgoEDFrwOfMQkf1Vmg4FbHBxvBmCQHbXHqS6XGVe', 'admin'),
('u2', 'Manager', 'manager@velvetkids.com', '$2b$10$8K1p/a0dL1LXMIgoEDFrwOfMQkf1Vmg4FbHBxvBmCQHbXHqS6XGVe', 'manager');

-- Seed Contact Messages
INSERT INTO contact_messages (id, name, email, subject, message, is_read) VALUES
('m1', 'Sara Ahmed', 'sara@example.com', 'Product Inquiry', 'Hi! I was wondering if the BrickWorld City Mega Set is compatible with other building block brands?', 0),
('m2', 'Tom Baker', 'tom@example.com', 'Order Support', 'My order #ORD-4820 hasn''t shipped yet. Can you check the status?', 1);

-- Seed Newsletter Subscribers
INSERT INTO newsletter_subscribers (id, email) VALUES
('n1', 'parent@example.com'),
('n2', 'shop@example.com');

-- Seed Site Settings
INSERT INTO site_settings (id, setting_key, setting_value) VALUES
('s1', 'site_name', 'Velvet Kids'),
('s2', 'tagline', 'Play Without Limits.'),
('s3', 'support_email', 'hello@velvetkids.com'),
('s4', 'support_phone', '+1 (800) VEL-KIDS'),
('s5', 'free_shipping_threshold', '50.00'),
('s6', 'standard_shipping_rate', '5.99');
