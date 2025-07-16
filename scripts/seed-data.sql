-- Insert sample issues
INSERT INTO issues (slug, title, description, content, priority, published) VALUES
('economy-jobs', 'Economy & Jobs', 'Creating opportunities for working families', 
'Our district needs good-paying jobs that allow families to thrive. I will work to:

• Support small businesses with reduced red tape and tax incentives
• Attract new industries while preserving our maritime heritage
• Invest in workforce development and job training programs
• Advocate for fair wages and worker protections
• Promote economic development that benefits all residents

The South Coast has tremendous potential. With the right policies, we can create an economy that works for everyone.', 1, true),

('education', 'Education', 'Investing in our children''s future',
'Every child deserves access to quality education. My priorities include:

• Fully funding our public schools and supporting our teachers
• Expanding access to early childhood education
• Improving school infrastructure and technology
• Supporting vocational and technical education programs
• Making higher education more affordable and accessible

Education is the foundation of opportunity. We must ensure every student has the tools they need to succeed.', 2, true),

('public-safety', 'Public Safety', 'Keeping our communities safe',
'Safe communities are the foundation of strong neighborhoods. I will:

• Support our police, fire, and emergency services with proper funding
• Address the opioid crisis with treatment and prevention programs
• Improve emergency preparedness and response capabilities
• Work on traffic safety improvements throughout the district
• Support community policing initiatives that build trust

Public safety requires partnership between law enforcement and the community.', 3, true),

('veterans', 'Veterans', 'Honoring those who served',
'Our veterans deserve our unwavering support. I am committed to:

• Expanding access to veterans'' healthcare and mental health services
• Supporting job training and placement programs for veterans
• Improving veterans'' housing assistance programs
• Ensuring proper funding for veterans'' services
• Honoring our veterans through community recognition programs

Those who served our country deserve our continued service to them.', 4, true),

('environment', 'Environment', 'Protecting our natural resources',
'The South Coast''s natural beauty is one of our greatest assets. I will:

• Protect our waterways and coastal areas from pollution
• Support renewable energy initiatives and green jobs
• Preserve open space and recreational areas
• Address climate change impacts on our coastal communities
• Promote sustainable development practices

We must be good stewards of our environment for future generations.', 5, true);

-- Insert sample events
INSERT INTO events (title, description, start_date, end_date, location, address, event_type, registration_required) VALUES
('Town Hall Meeting - Westport', 'Join Steven for a community discussion on the issues that matter most to Westport residents.', 
'2024-02-15 19:00:00-05', '2024-02-15 20:30:00-05', 'Westport Town Hall', '816 Main Rd, Westport, MA 02790', 'Town Hall', false),

('Coffee with the Candidate - Fall River', 'Informal meet and greet over coffee. Come share your thoughts and concerns.', 
'2024-02-20 09:00:00-05', '2024-02-20 11:00:00-05', 'Tipsy Seagull Cafe', '1234 Pleasant St, Fall River, MA 02720', 'Meet & Greet', false),

('Campaign Kickoff Rally', 'Join us for the official campaign kickoff! Food, music, and special guests.', 
'2024-02-25 14:00:00-05', '2024-02-25 17:00:00-05', 'New Bedford Waterfront', 'State Pier, New Bedford, MA 02740', 'Rally', true);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, published, published_at) VALUES
('Why I''m Running for State Representative', 'why-im-running', 
'After decades of service to our community, I''m ready to take the next step and fight for the 8th Bristol District in the State House.',
'# Why I''m Running for State Representative

After spending my career serving the people of the South Coast, I''ve seen firsthand the challenges our communities face. From economic uncertainty to aging infrastructure, from educational funding shortfalls to healthcare access issues, our district needs a strong voice on Beacon Hill.

## My Commitment to You

I''m not running to advance a political career or to serve special interests. I''m running because I believe in the power of common-sense leadership and the potential of our communities.

### Economic Development
Our region has incredible assets - our ports, our skilled workforce, our entrepreneurial spirit. We need to leverage these strengths while supporting the small businesses that are the backbone of our economy.

### Education Excellence  
Every child deserves access to quality education, from early childhood through higher education. I''ll fight for full funding of our schools and support for our dedicated teachers.

### Public Safety
Safe communities are strong communities. I''ll work to ensure our police, fire, and emergency services have the resources they need while building trust between law enforcement and the communities they serve.

This campaign is about all of us working together to build a stronger future for the 8th Bristol District. I hope I can count on your support.', true, '2024-01-10 10:00:00-05'),

('Supporting Our Small Businesses', 'supporting-small-businesses',
'Small businesses are the economic engine of our district. Here''s my plan to help them thrive.',
'# Supporting Our Small Businesses

Small businesses are more than just economic engines - they''re the heart of our communities. From the family restaurant that sponsors the little league team to the local contractor who employs neighborhood residents, small businesses make our district stronger.

## The Challenges They Face

Too often, small business owners tell me they''re drowning in red tape and struggling with:
- Complex regulatory requirements
- High taxes and fees
- Difficulty accessing capital
- Competition from large corporations
- Rising costs of operation

## My Plan to Help

### Reduce Regulatory Burden
We need to streamline permitting processes and eliminate unnecessary bureaucratic hurdles that prevent businesses from growing and creating jobs.

### Tax Relief
I''ll advocate for tax policies that give small businesses room to breathe and invest in their growth.

### Access to Capital
Supporting programs that help small businesses access the funding they need to start, grow, and modernize.

### Buy Local Initiatives
Encouraging government agencies and institutions to prioritize local businesses when making purchasing decisions.

When our small businesses succeed, our entire community benefits through job creation, increased tax revenue, and stronger neighborhoods.', true, '2024-01-14 15:30:00-05'),

('Investing in Our Infrastructure', 'investing-in-infrastructure',
'From roads and bridges to broadband and water systems, our infrastructure needs attention.',
'# Investing in Our Infrastructure

Good infrastructure is the foundation of a thriving economy and quality of life. Unfortunately, too much of our district''s infrastructure is aging and in need of significant investment.

## The State of Our Infrastructure

### Transportation
- Many of our roads and bridges need repair or replacement
- Public transportation options are limited
- Traffic congestion affects quality of life and economic development

### Utilities
- Some areas still lack reliable high-speed internet
- Water and sewer systems need modernization
- Electric grid improvements are needed for reliability

### Public Facilities
- Schools need infrastructure improvements
- Municipal buildings require updates
- Parks and recreational facilities need investment

## My Infrastructure Priorities

### Smart Investment
We need to prioritize projects that provide the greatest benefit to residents and businesses while being fiscally responsible.

### Federal and State Funding
I''ll work to secure every available dollar from federal and state infrastructure programs.

### Public-Private Partnerships
Exploring innovative financing mechanisms that leverage private investment for public benefit.

### Future-Ready Planning
Ensuring our infrastructure investments prepare us for future needs, including climate resilience and technological advancement.

Infrastructure investment isn''t just about fixing what''s broken - it''s about building the foundation for future prosperity.', true, '2024-01-18 11:00:00-05');

-- Insert sample testimonials
INSERT INTO testimonials (name, title, organization, content, location, featured, approved) VALUES
('Maria Santos', 'Small Business Owner', 'Santos Family Restaurant', 
'Steven has always been a champion for small businesses in our community. He understands the challenges we face and has practical solutions to help us succeed.', 
'Fall River', true, true),

('Chief Robert Johnson', 'Fire Chief', 'Westport Fire Department', 
'Steven''s commitment to public safety is unwavering. He''s worked with us to secure funding for new equipment and training. Our community is safer because of his advocacy.', 
'Westport', true, true),

('Dr. Patricia Williams', 'Superintendent', 'Freetown-Lakeville Regional School District', 
'Education has always been a priority for Steven. He''s fought for increased funding and resources for our schools. Our students benefit from his dedication to educational excellence.', 
'Freetown', false, true);

-- Insert sample social media posts
INSERT INTO social_posts (platform, content, published_at, external_url) VALUES
('twitter', 'Great turnout at today''s town hall in Westport! Thank you to everyone who came out to discuss the issues that matter most to our community. Together, we can build a stronger future for the 8th Bristol District. #CeceriForStateRep', 
'2024-01-15 15:30:00-05', 'https://twitter.com/cecerep/status/1'),

('facebook', 'Small businesses are the backbone of our economy. That''s why I''m committed to reducing red tape and supporting local entrepreneurs. When our businesses thrive, our communities thrive.', 
'2024-01-14 20:45:00-05', 'https://facebook.com/cecerep/posts/1'),

('instagram', 'Honored to receive the endorsement of the South Coast Labor Council. Together, we''ll fight for good-paying jobs and worker protections.', 
'2024-01-12 19:20:00-05', 'https://instagram.com/p/cecerep1'),

('blog', 'My Plan for Education: Investing in Our Children''s Future. Every child in the 8th Bristol District deserves access to quality education. Here''s how we can make that happen...', 
'2024-01-13 14:00:00-05', '/blog/education-plan'),

('youtube', 'Watch my latest video on public safety initiatives for our district. We need to support our first responders while building stronger community partnerships.', 
'2024-01-11 21:00:00-05', 'https://youtube.com/watch?v=cecerep1'),

('twitter', 'Veterans Day reminder: Our veterans deserve our unwavering support. I''m committed to expanding access to healthcare, job training, and housing assistance for those who served our country.', 
'2024-01-10 16:00:00-05', 'https://twitter.com/cecerep/status/2');
