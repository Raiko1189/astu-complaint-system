import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, MessageSquare, BarChart3,
  ArrowRight, Building2, Wrench, Wifi,
  Activity, Shield, TrendingUp
} from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Cinematic Background */}
      <div className="heritage-mesh"></div>

      {/* Hero Section - Award Winning Depth */}
      <section className="hero-premium">
        <div className="hero-layout">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero-badge">
                <span>Next-Gen Institutional Intelligence</span>
              </div>
              <h1>
                Academic Excellence <br />
                <span className="text-glow">Precision Accountability</span>
              </h1>
              <p className="hero-description">
                The premier digital orchestration layer for ASTU administration.
                Built with sovereign AI transparency and institutional rigor.
              </p>
              <div className="hero-btns">
                <Link to="/submit-complaint" className="btn-primary-silk">
                  Initiate Report <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="btn-outline-silk">
                  Explore Protocol
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="hero-visual-frame"
          >
            <div className="image-container-silk">
              <img
                src="https://i.pinimg.com/1200x/f6/a6/80/f6a68049dda3b982ef1094424880760b.jpg"
                alt="ASTU Dormitor"
                className="hero-main-img"
              />
              <div className="hero-img-glow"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid - Precision Engineering */}
      <section className="features-showcase">
        <div className="section-header">
          <h2 className="title-silk">Strategic Operational Clusters</h2>
          <p className="subtitle-silk">
            Advanced architectural nodes designed to facilitate seamless university governance.
          </p>
        </div>

        <div className="feature-grid-silk">
          {/* AI Feature */}
          <motion.div whileHover={{ y: -10 }} className="feature-card-silk">
            <div className="card-image-header">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Student Support" />
              <div className="card-image-overlay"></div>
            </div>

            <div className="card-content-overlay">
              <div className="card-top">
                <div className="card-icon-box">
                  <MessageSquare size={32} />
                </div>
                <span className="status-chip active">Assistant Online</span>
              </div>
              <h3>AI-Driven Support</h3>
              <p>
                Instant guidance on campus policies, dormitory regulations, and technical support.
                Our AI understands the context of ASTU's official documentation.
              </p>
              <div className="card-footer-mini">
                <div className="activity-wave">
                  <span></span><span></span><span></span><span></span>
                </div>
                <span className="footer-label">Smart Retrieval</span>
              </div>
            </div>
          </motion.div>

          {/* Workflow Feature */}
          <motion.div whileHover={{ y: -10 }} className="feature-card-silk">
            <div className="card-image-header">
              <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800" alt="Secure Ledger" />
              <div className="card-image-overlay"></div>
            </div>

            <div className="card-content-overlay">
              <div className="card-top">
                <div className="card-icon-box">
                  <ShieldCheck size={32} />
                </div>
                <span className="status-chip verified">System Verified</span>
              </div>
              <h3>Secure Resolution Path</h3>
              <p>
                Submit and track complaints with end-to-end transparency.
                Every issue is logged, assigned to the correct department, and verifiable.
              </p>
              <div className="card-footer-mini">
                <div className="security-tag">
                  <Shield size={12} />
                  <span>Encrypted Ledger</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Analytics Feature */}
          <motion.div whileHover={{ y: -10 }} className="feature-card-silk">
            <div className="card-image-header">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Analytics" />
              <div className="card-image-overlay"></div>
            </div>

            <div className="card-content-overlay">
              <div className="card-top">
                <div className="card-icon-box">
                  <BarChart3 size={32} />
                </div>
                <span className="status-chip live">Feed Active</span>
              </div>
              <h3>Administrative Insights</h3>
              <p>
                Real-time metrics for university leadership to monitor resolution performance
                across all departments and improve campus health.
              </p>
              <div className="card-footer-mini">
                <div className="mini-graph">
                  <div className="bar" style={{ height: '40%' }}></div>
                  <div className="bar" style={{ height: '70%' }}></div>
                  <div className="bar" style={{ height: '55%' }}></div>
                  <div className="bar" style={{ height: '90%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workflow Section - High Precision Living Pipeline */}
      <section className="architecture-section">
        <div className="section-bg-watermark">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" alt="Institutional Background" />
        </div>

        <div className="architecture-container">
          <div className="arch-header">
            <h2 className="title-silk">The Oversight Workflow</h2>
            <p className="subtitle-silk">
              A high-precision modular pipeline engineered for institutional accountability.
            </p>
          </div>

          <div className="pipeline-visual">
            <div className="pipeline-stream"></div>

            <div className="pipeline-grid">
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="pipeline-card-glass"
              >
                <div className="pipeline-node"><span className="pulse"></span></div>
                <div className="pipeline-icon">
                  <MessageSquare size={24} />
                </div>
                <div className="pipeline-body">
                  <span className="step-tag">Phase 01</span>
                  <h4>Intelligent Ingestion</h4>
                  <p>AI-driven semantic categorization of administrative concerns across the ecosystem.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="pipeline-card-glass"
              >
                <div className="pipeline-node"><span className="pulse"></span></div>
                <div className="pipeline-icon">
                  <TrendingUp size={24} />
                </div>
                <div className="pipeline-body">
                  <span className="step-tag">Phase 02</span>
                  <h4>Sovereign Routing</h4>
                  <p>Automated, encrypted delivery to corresponding department heads with priority weighting.</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="pipeline-card-glass"
              >
                <div className="pipeline-node"><span className="pulse"></span></div>
                <div className="pipeline-icon">
                  <ShieldCheck size={24} />
                </div>
                <div className="pipeline-body">
                  <span className="step-tag">Phase 03</span>
                  <h4>Verified Resolution</h4>
                  <p>Immutable logging of outcomes and complete policy compliance verification.</p>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="arch-visual-footer">
            <div className="visual-indicator-pill">
              <Activity size={16} />
              <span>Real-time Pipeline Sync: Active</span>
            </div>
            <div className="visual-indicator-pill">
              <Shield size={16} />
              <span>Encryption Status: AES-256 Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Institutional Integrity */}
      <section className="integrity-section">
        <div className="integrity-content">
          <h2 className="title-silk">Institutional Momentum</h2>
          <div className="metrics-strip">
            <div className="metric-box">
              <span className="metric-val">99.8%</span>
              <span className="metric-lab">Resolution Velocity</span>
            </div>
            <div className="metric-box">
              <span className="metric-val">50ms</span>
              <span className="metric-lab">RAG Latency</span>
            </div>
            <div className="metric-box">
              <span className="metric-val">CoreV2</span>
              <span className="metric-lab">System Status</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
