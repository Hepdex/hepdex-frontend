// ServicesPage.jsx
//import React from "../components/Header";
//import Header from './Header'; // Assuming this is the correct import path
import styles from '../styles/ServicesPage.module.css'; // Adjust the path as necessary

const ServicesPage = () => {
  const employerServices = [
    {
      icon: '👥',
      title: 'Talent Acquisition',
      description: 'Access a vast pool of qualified candidates across various industries and skill levels.',
      features: ['Advanced candidate filtering', 'AI-powered matching', 'Skills assessment tools']
    },
    {
      icon: '📋',
      title: 'Job Posting & Management',
      description: 'Create compelling job listings and manage applications efficiently.',
      features: ['Custom job templates', 'Application tracking', 'Automated responses']
    },
    {
      icon: '🎯',
      title: 'Targeted Recruitment',
      description: 'Reach the right candidates with precision targeting and smart recommendations.',
      features: ['Location-based targeting', 'Skill-based matching', 'Industry specialization']
    },
    {
      icon: '📊',
      title: 'Analytics & Insights',
      description: 'Track your recruitment performance with detailed analytics and reporting.',
      features: ['Hiring metrics', 'Time-to-hire tracking', 'Cost per hire analysis']
    }
  ];

  const candidateServices = [
    {
      icon: '🔍',
      title: 'Job Search & Discovery',
      description: 'Find opportunities that match your skills, experience, and career goals.',
      features: ['Smart job recommendations', 'Salary insights', 'Company reviews']
    },
    {
      icon: '📄',
      title: 'Resume & Profile Building',
      description: 'Create professional profiles and resumes that stand out to employers.',
      features: ['Resume templates', 'Profile optimization', 'Skills showcase']
    },
    {
      icon: '🤝',
      title: 'Application Management',
      description: 'Track your applications and manage your job search process effectively.',
      features: ['Application tracking', 'Interview scheduling', 'Status updates']
    },
    {
      icon: '🎓',
      title: 'Career Development',
      description: 'Access resources and tools to advance your career and improve your skills.',
      features: ['Skill assessments', 'Career guidance', 'Industry insights']
    }
  ];

  const additionalServices = [
    {
      icon: '🛡️',
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security and privacy measures.'
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Get help when you need it with our dedicated customer support team.'
    },
    {
      icon: '🌐',
      title: 'Global Reach',
      description: 'Connect with opportunities and talent from around the world.'
    },
    {
      icon: '⚡',
      title: 'Fast Matching',
      description: 'Our AI-powered algorithms ensure quick and accurate job-candidate matching.'
    }
  ];

  return (
    <div className={styles.servicesPage}>
      {/*<Header />*/}
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Comprehensive Job Platform <span className={styles.highlight}>Services</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Connecting talent with opportunity through innovative technology and personalized service
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10K+</span>
                <span className={styles.statLabel}>Active Jobs</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>50K+</span>
                <span className={styles.statLabel}>Registered Users</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>95%</span>
                <span className={styles.statLabel}>Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employer Services */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>For Employers</h2>
            <p className={styles.sectionSubtitle}>
              Streamline your hiring process and find the best talent for your organization
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {employerServices.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.featureList}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <span className={styles.checkmark}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Candidate Services */}
      <section className={`${styles.servicesSection} ${styles.candidateSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>For Job Seekers</h2>
            <p className={styles.sectionSubtitle}>
              Discover opportunities and advance your career with our comprehensive tools
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {candidateServices.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>{service.icon}</div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.featureList}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <span className={styles.checkmark}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className={styles.additionalServices}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Choose HepDex?</h2>
            <p className={styles.sectionSubtitle}>
              We provide more than just job matching - we deliver a complete recruitment experience
            </p>
          </div>
          <div className={styles.additionalGrid}>
            {additionalServices.map((service, index) => (
              <div key={index} className={styles.additionalCard}>
                <div className={styles.additionalIcon}>{service.icon}</div>
                <h3 className={styles.additionalTitle}>{service.title}</h3>
                <p className={styles.additionalDescription}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaSubtitle}>
              Join thousands of employers and job seekers who trust HepDex for their career needs
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryBtn}>Post a Job</button>
              <button className={styles.secondaryBtn}>Find Jobs</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;