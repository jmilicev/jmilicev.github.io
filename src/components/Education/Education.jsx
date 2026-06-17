import './Education.css'
import yorkLogo from '../../share/york.png'

export default function Education() {
  return (
    <section className="edu-section">
      <div className="container">
        <div className="reveal">
          <p className="section-eyebrow"><span>03</span> Education</p>
          <h2 className="edu-heading">Academic Background</h2>
        </div>

        <div className="edu-card reveal" style={{ '--delay': '90ms' }}>
          <div className="edu-left">
            <p className="edu-degree-label">Honours Bachelor of Arts</p>
            <h3 className="edu-degree">Computer<br />Science</h3>
            <p className="edu-uni">York University</p>

            <div className="edu-stats">
              <div className="edu-stat">
                <span className="edu-stat-key">period</span>
                <span className="edu-stat-val">2018 – 2023</span>
              </div>
              <div className="edu-stat">
                <span className="edu-stat-key">standing</span>
                <span className="edu-stat-val">First Class</span>
              </div>
            </div>
          </div>

          <div className="edu-right">
            <img src={yorkLogo} alt="York University" className="edu-logo" />

            <div>
              <p className="edu-courses-label">Relevant Coursework</p>
              <div className="edu-tags">
                {['Algorithms', 'Machine Learning', 'Software Design', 'Database Systems', 'Finance & Economics'].map(c => (
                  <span key={c} className="edu-tag">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
