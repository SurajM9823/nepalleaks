import { Article } from '../types';

// Helper function to generate realistic dates
const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Generate article IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Sample articles data
export const articles: Article[] = [
  {
    id: generateId(),
    title: 'Government Announces New Economic Reform Package',
    slug: 'government-announces-new-economic-reform-package',
    excerpt: 'The government has unveiled a comprehensive economic reform package aimed at boosting growth and addressing inflation concerns.',
    content: `The government today announced a comprehensive economic reform package that aims to revitalize the economy and address growing concerns about inflation. The package includes tax incentives for small businesses, infrastructure development projects, and measures to control rising prices of essential commodities.

Finance Minister stated that these reforms are expected to create thousands of jobs and stimulate economic growth by at least 2% in the coming fiscal year. Opposition leaders, however, have criticized the package, calling it "insufficient" and "poorly targeted."

Economists have mixed opinions about the effectiveness of these measures, with some praising the focus on small businesses while others expressing concerns about the fiscal deficit implications.`,
    author: 'Rajesh Sharma',
    authorImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    imageUrl: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Economy',
    tags: ['economy', 'reform', 'government', 'inflation'],
    readTime: 4,
    featured: true,
    views: 1240
  },
  {
    id: generateId(),
    title: 'Supreme Court Ruling Changes Election Campaign Regulations',
    slug: 'supreme-court-ruling-changes-election-campaign-regulations',
    excerpt: 'A landmark Supreme Court decision has significantly altered the regulations governing election campaigns, with far-reaching implications.',
    content: `In a landmark decision, the Supreme Court has ruled 5-4 to overturn previous regulations on election campaign financing. The ruling, which has significant implications for upcoming elections, removes several restrictions on campaign donations and advertising.

Chief Justice explained that the decision was based on constitutional protections of free speech, stating that "political speech must prevail against laws that would suppress it." Dissenting justices warned that the ruling could lead to undue influence of wealthy donors on the electoral process.

Political analysts suggest this ruling will dramatically change campaign strategies in the upcoming election cycle, potentially leading to record spending on political advertisements.`,
    author: 'Amrita Patel',
    authorImage: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    imageUrl: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Politics',
    tags: ['supreme court', 'election', 'campaign', 'ruling'],
    readTime: 5,
    featured: true,
    trending: true,
    views: 2350
  },
  {
    id: generateId(),
    title: 'Human Rights Commission Reports Rise in Digital Privacy Violations',
    slug: 'human-rights-commission-reports-rise-in-digital-privacy-violations',
    excerpt: 'A new report highlights increasing concerns about digital privacy breaches and their impact on human rights.',
    content: `The National Human Rights Commission has released a comprehensive report documenting a 32% increase in digital privacy violations over the past year. The report highlights growing concerns about surveillance, data breaches, and online harassment.

Commission Chairperson emphasized that "digital rights are human rights" and called for stronger legislative frameworks to protect citizens in the digital space. The report specifically mentions the need for better regulation of social media platforms and data collection practices by both government agencies and private corporations.

Civil liberties organizations have welcomed the report, calling it a "wake-up call" for policymakers to address the evolving challenges in protecting privacy rights in the digital age.`,
    author: 'Binod Thapa',
    authorImage: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    imageUrl: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Rights',
    tags: ['human rights', 'privacy', 'digital', 'data'],
    readTime: 6,
    featured: false,
    views: 1780
  },
  {
    id: generateId(),
    title: 'Climate Summit Ends with New Global Emissions Agreement',
    slug: 'climate-summit-ends-with-new-global-emissions-agreement',
    excerpt: 'World leaders have reached a historic agreement to reduce carbon emissions following two weeks of intense negotiations.',
    content: `After two weeks of intense negotiations, the International Climate Summit has concluded with a historic agreement to reduce global carbon emissions by 45% by 2030. The pact, signed by 192 countries, includes specific targets for different economic sectors and financial commitments to support developing nations in their transition to cleaner energy sources.

Environmental activists have cautiously welcomed the agreement while emphasizing the need for accountability mechanisms to ensure countries meet their pledges. Several major fossil fuel-producing nations secured compromises that allow for gradual phase-outs rather than immediate cuts.

The agreement also establishes a $100 billion annual fund to support climate adaptation and mitigation efforts in vulnerable regions, addressing a key demand from developing countries.`,
    author: 'Sarita Giri',
    authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    imageUrl: 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'World',
    tags: ['climate', 'emissions', 'global', 'agreement'],
    readTime: 7,
    featured: true,
    views: 3420
  },
  {
    id: generateId(),
    title: 'Tech Giant Unveils Revolutionary AI Healthcare System',
    slug: 'tech-giant-unveils-revolutionary-ai-healthcare-system',
    excerpt: 'A cutting-edge artificial intelligence system promises to transform healthcare delivery and improve patient outcomes.',
    content: `Global technology leader MediTech has unveiled a revolutionary artificial intelligence system designed to transform healthcare delivery. The AI platform, named "HealthGuard," can analyze medical images, predict patient outcomes, and recommend personalized treatment plans with unprecedented accuracy.

Initial clinical trials show the system outperforming human specialists in diagnosing several common conditions, including pneumonia and diabetic retinopathy. The company claims the technology could reduce diagnostic errors by up to 40% while significantly decreasing healthcare costs.

Medical ethicists have raised questions about data privacy, algorithmic bias, and the changing role of healthcare professionals as AI systems become more integrated into clinical practice. Regulatory agencies are currently reviewing the technology before approving it for widespread adoption.`,
    author: 'Pradeep Karki',
    authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    imageUrl: 'https://images.pexels.com/photos/3825584/pexels-photo-3825584.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Technology',
    tags: ['AI', 'healthcare', 'technology', 'innovation'],
    readTime: 5,
    featured: false,
    trending: true,
    views: 4560
  },
  {
    id: generateId(),
    title: 'New Study Reveals Surprising Benefits of Traditional Herbal Medicine',
    slug: 'new-study-reveals-surprising-benefits-of-traditional-herbal-medicine',
    excerpt: 'Research finds evidence supporting the efficacy of several traditional remedies for common health conditions.',
    content: `A comprehensive study published in the International Journal of Medical Research has found significant evidence supporting the efficacy of several traditional herbal remedies for common health conditions. The research, conducted over five years, evaluated the effects of 12 commonly used medicinal plants on various ailments including inflammation, digestive disorders, and respiratory conditions.

Lead researcher Dr. Anita Gurung explained that modern scientific methods confirmed the therapeutic properties of these plants, many of which have been used in traditional medicine for centuries. "These findings bridge the gap between traditional knowledge and modern medicine," she stated.

Pharmaceutical companies have shown interest in the research, with several already exploring the development of new drugs based on the active compounds identified in these traditional remedies.`,
    author: 'Manisha Rai',
    authorImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    imageUrl: 'https://images.pexels.com/photos/6693654/pexels-photo-6693654.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Health',
    tags: ['health', 'medicine', 'research', 'traditional'],
    readTime: 4,
    featured: false,
    views: 2150
  },
  {
    id: generateId(),
    title: 'Opinion: The Digital Divide Is Widening - We Must Act Now',
    slug: 'opinion-the-digital-divide-is-widening-we-must-act-now',
    excerpt: 'As technology advances, the gap between the connected and unconnected grows, threatening to leave millions behind.',
    content: `As we celebrate remarkable technological advances, we must confront an uncomfortable truth: the digital divide is widening at an alarming rate. While urban centers enjoy 5G networks and smart city infrastructure, rural communities struggle with basic connectivity, and this disparity threatens to reinforce existing socioeconomic inequalities.

Recent statistics show that nearly 40% of our rural population lacks reliable internet access, effectively excluding them from digital education resources, telehealth services, and remote work opportunities that have become essential in the post-pandemic world.

The solution requires a multifaceted approach: government investment in rural broadband infrastructure, private sector initiatives to provide affordable devices and services, and educational programs to develop digital literacy. Most importantly, we need to recognize internet access as a fundamental right, not a luxury.

If we fail to address this digital divide now, we risk creating a permanent underclass of citizens unable to participate in our increasingly digital society and economy.`,
    author: 'Prof. Hari Bahadur',
    authorImage: 'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    imageUrl: 'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Opinion',
    tags: ['digital divide', 'technology', 'inequality', 'opinion'],
    readTime: 6,
    featured: false,
    views: 1980
  },
  {
    id: generateId(),
    title: 'Local Film Festival Showcases Emerging Talent',
    slug: 'local-film-festival-showcases-emerging-talent',
    excerpt: 'The annual Urban Film Festival returns with an impressive lineup of independent films and new directors.',
    content: `The 15th Annual Urban Film Festival opened yesterday with a record number of submissions and attendance, showcasing the work of emerging filmmakers from across the region. This year's festival features 45 films across various genres, with a particular focus on social issues and cultural identity.

Festival director Sunita Adhikari noted that this year's submissions reflect a growing confidence among young filmmakers to tackle complex themes. "We're seeing bold, innovative storytelling that pushes boundaries while remaining deeply rooted in our cultural context," she said.

The festival also includes workshops, panel discussions, and networking events designed to support the development of the local film industry. Several international distributors and production companies are in attendance, offering opportunities for filmmakers to secure broader distribution for their work.`,
    author: 'Kiran Shahi',
    authorImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Entertainment',
    tags: ['film', 'festival', 'culture', 'arts'],
    readTime: 3,
    featured: false,
    views: 1650
  },
  {
    id: generateId(),
    title: 'Corruption Allegations Surface in Infrastructure Project',
    slug: 'corruption-allegations-surface-in-infrastructure-project',
    excerpt: 'Documents reveal potential misuse of funds in major government infrastructure development.',
    content: `Leaked documents have revealed serious allegations of corruption in the Central Highway Project, a flagship infrastructure initiative with a budget of over $500 million. The documents, verified by independent analysts, suggest systematic overpricing of materials, ghost employees on payroll, and kickbacks to officials overseeing the project.

An investigation by NepalLeaks found that actual construction costs were approximately 30% lower than reported figures, with the difference allegedly diverted through a network of shell companies linked to senior officials and their relatives.

The Ministry of Infrastructure has announced the formation of a high-level committee to investigate these allegations, while opposition parties have called for the resignation of the minister and criminal prosecution of those involved. Anti-corruption activists are planning nationwide protests to demand greater transparency in government projects.`,
    author: 'Investigation Team',
    authorImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    imageUrl: 'https://images.pexels.com/photos/687574/pexels-photo-687574.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Politics',
    tags: ['corruption', 'investigation', 'infrastructure', 'government'],
    readTime: 8,
    featured: true,
    trending: true,
    views: 5870
  },
  {
    id: generateId(),
    title: 'Market Analysis: Inflation Concerns Grow as Economy Shows Mixed Signals',
    slug: 'market-analysis-inflation-concerns-grow',
    excerpt: 'Economic experts warn of persistent inflation despite recent growth indicators in key sectors.',
    content: `Economic analysts are expressing growing concerns about inflation despite recent positive indicators in manufacturing and services sectors. The latest data shows consumer prices rising at an annual rate of 6.8%, the highest in over a decade, while wage growth remains stagnant at 2.3%.

Financial markets have responded with volatility, with the main stock index dropping 2.4% yesterday as investors adjust their expectations for potential interest rate hikes. Central Bank officials have signaled they might accelerate their timeline for monetary policy adjustment if inflation continues to exceed targets.

Small business owners report significant challenges with rising input costs and difficulties in hiring, with many forced to pass increased costs to consumers. "We're caught between higher supplier prices and customers who are already stretched thin," explained local retailer Anil Shrestha.`,
    author: 'Economist Team',
    authorImage: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    imageUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Economy',
    tags: ['economy', 'inflation', 'market', 'analysis'],
    readTime: 5,
    featured: false,
    views: 2340
  },
  {
    id: generateId(),
    title: 'Women\'s Rights Organization Launches Rural Empowerment Initiative',
    slug: 'womens-rights-organization-launches-rural-empowerment-initiative',
    excerpt: 'A new program aims to provide economic opportunities and legal support for women in underserved communities.',
    content: `The Women's Empowerment Coalition has launched an ambitious initiative targeting rural communities, with programs focused on economic independence, legal rights, and leadership development for women. The three-year project, funded by a $2.5 million grant, will operate in 50 villages across five districts.

The initiative includes microfinance opportunities, vocational training, and mobile legal aid clinics to address issues like domestic violence, property rights, and workplace discrimination. "Many rural women face multiple barriers to equality, from limited education to entrenched cultural norms," explained program director Maya Tamang.

Early response has been positive, with over 500 women enrolling in the first phase of the program. Local government officials have pledged support, recognizing the potential economic benefits of increasing women's participation in the formal economy.`,
    author: 'Sabina Rana',
    authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    imageUrl: 'https://images.pexels.com/photos/6457391/pexels-photo-6457391.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Rights',
    tags: ['women', 'rights', 'empowerment', 'rural'],
    readTime: 4,
    featured: false,
    views: 1850
  },
  {
    id: generateId(),
    title: 'International Trade Tensions Escalate with New Tariffs',
    slug: 'international-trade-tensions-escalate-with-new-tariffs',
    excerpt: 'Major economies implement retaliatory tariffs, raising concerns about global economic growth.',
    content: `Trade tensions between major global economies have escalated following the introduction of new tariffs on a range of agricultural and manufactured goods. The measures, which affect approximately $75 billion in trade, represent a significant escalation in the ongoing trade disputes that have destabilized global markets.

Economic analysts warn that continued trade hostilities could reduce global GDP growth by 0.5% over the next year and disrupt supply chains across multiple industries. Small and medium-sized businesses are particularly vulnerable to these disruptions, with many reporting difficulties in sourcing materials and accessing export markets.

Diplomatic efforts to resolve the disputes have stalled, with both sides demanding concessions before returning to negotiations. The International Trade Organization has called for restraint, emphasizing that "a cycle of retaliation serves no country's long-term interests."`,
    author: 'Dipendra Ojha',
    authorImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    imageUrl: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'World',
    tags: ['trade', 'tariffs', 'economy', 'international'],
    readTime: 6,
    featured: false,
    trending: true,
    views: 2870
  }
];

export const featuredArticles = articles.filter(article => article.featured).slice(0, 5);

export const latestArticles = [...articles].sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
}).slice(0, 8);

export const trendingArticles = articles.filter(article => article.trending).slice(0, 4);