import { useEffect, useRef } from 'react'
import './Experience.css'
import MaskedHeading from '../shared/MaskedHeading'
import metrolinxLogo from '../../share/metrolinx.jpeg'
import chatbaseLogo  from '../../share/chatbase.png'
import yorkLogo      from '../../share/york.png'
import bnsLogo       from '../../share/bns.png'

const jobs = [
  {
    role: 'Senior Reporting Specialist',
    company: 'Metrolinx',
    url: 'https://www.metrolinx.com/en',
    logo: metrolinxLogo,
    period: 'June 2025 – Present',
    current: true,
    bullets: [
      'Lead executive-facing Power BI dashboards and data pipelines, ensuring accuracy, performance, and alignment with evolving business priorities.',
      'Supervise a team of analysts — assigning tasks, reviewing deliverables, and mentoring in reporting best practices and technical execution.',
      'Act as key liaison between procurement, finance, and IT leadership to define high-level reporting requirements and prioritize analytics initiatives.',
      'Manage reporting architecture evolution: Azure Databricks, SharePoint, and enterprise system integrations for improved scalability and data integrity.',
      'Enhance data governance by formalizing documentation, ownership, and change management protocols across reporting domains.',
      'Represent the reporting function in executive meetings, translating data insights into actionable business recommendations.',
      'Lead internal training workshops to build organizational capacity in self-serve reporting and data-informed decision making.',
    ],
  },
  {
    role: 'Business Intelligence & Reporting Analyst',
    company: 'Metrolinx',
    url: 'https://www.metrolinx.com/en',
    logo: metrolinxLogo,
    period: 'Nov 2024 – June 2025',
    bullets: [
      'Designed and maintained executive-facing Power BI dashboards integrated with Azure Databricks for real-time KPI monitoring.',
      'Facilitated cross-functional collaboration between procurement, finance, and IT teams to align reporting with business objectives.',
      'Established data governance standards and improved data quality across reporting functions.',
      'Implemented role-based access protocols to ensure data compliance with organizational policies.',
      'Provided decision support through recurring performance reports and ad hoc analysis.',
      'Delivered training workshops to support adoption of data-informed decision-making practices.',
      'Mentored junior staff in reporting best practices and stakeholder engagement.',
    ],
  },
  {
    role: 'Procurement Analyst',
    company: 'Metrolinx',
    url: 'https://www.metrolinx.com/en',
    logo: metrolinxLogo,
    period: 'Jan 2023 – Nov 2024',
    bullets: [
      'Developed Power BI dashboards tracking procurement activities — requisitions, purchase orders, and tenders — to enable data-driven decisions.',
      'Prepared detailed reports for government agencies including MTO and Supply Ontario.',
      'Automated recurring procurement reporting in Excel, improving efficiency and reducing manual errors.',
      'Administered the Pcard program, managing transaction data and ensuring policy compliance.',
      'Led variance analysis on procurement expenditures, optimizing budget management and supplier contracts.',
      'Created board reports featuring key procurement metrics that informed executive decision-making.',
      'Contributed to procurement policy development aligned with regulatory requirements.',
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Chatbase',
    url: 'https://www.chatbase.co',
    logo: chatbaseLogo,
    period: 'May 2023 – Sept 2023',
    bullets: [
      'Built a comprehensive interactive API documentation website with clear integration instructions for external developers.',
      'Conducted thorough API testing using Postman and CURL across multiple platforms.',
      'Developed a Discord Bot enabling users to interact with the service through Discord.',
      'Enhanced documentation with interactive code samples and live demos, increasing developer engagement.',
      'Identified and reported API bugs to the development team for prompt resolution.',
    ],
  },
  {
    role: 'Undergraduate Teaching Assistant',
    company: 'York University',
    url: 'https://www.yorku.ca',
    logo: yorkLogo,
    period: 'Sept 2022 – Jan 2023',
    bullets: [
      'Taught RISC-V assembly language and computer architecture fundamentals in iVerilog to 50+ students.',
      'Graded assignments and exams with detailed feedback that improved class averages.',
      'Developed supplementary course materials including sample problems and quizzes.',
      'Provided one-on-one tutoring to students needing extra help, boosting confidence and performance.',
      'Acted as liaison between students and professors, improving course delivery effectiveness.',
    ],
  },
  {
    role: 'Customer Experience Associate',
    company: 'Scotiabank',
    url: 'https://www.scotiabank.com/ca/en/personal.html',
    logo: bnsLogo,
    period: 'April 2022 – Jan 2024',
    bullets: [
      'Assisted clients with banking transactions including bank drafts, mortgage payouts, and loan payments.',
      'Analyzed incoming cheques, drafts, and wire payments to prevent fraudulent activity.',
      'Coordinated client appointments for a team of 10+ professionals.',
      'Led training sessions for new associates on transaction accuracy and fraud prevention.',
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const fillRef    = useRef(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.exp-card')
    if (!cards) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.06 }
    )
    cards.forEach(c => io.observe(c))
    return () => io.disconnect()
  }, [])

  // Timeline draws itself as you scroll; dots ignite as they pass
  useEffect(() => {
    const track = trackRef.current
    const fill  = fillRef.current
    const cards = sectionRef.current?.querySelectorAll('.exp-card')
    if (!track || !fill || !cards) return

    let raf = 0
    const update = () => {
      raf = 0
      const r   = track.getBoundingClientRect()
      const mid = window.innerHeight * 0.45
      const p   = Math.min(1, Math.max(0, (mid - r.top) / r.height))
      fill.style.height = `${p * 100}%`
      cards.forEach(card => {
        card.classList.toggle('passed', card.getBoundingClientRect().top + 34 < mid)
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="exp-section" ref={sectionRef}>
      <div className="container">
        <div className="reveal">
          <p className="section-eyebrow"><span>01</span> Experience</p>
          <MaskedHeading className="exp-heading" text="Where I've worked" />
        </div>

        <div className="exp-timeline">
          <div className="exp-track" ref={trackRef} aria-hidden="true">
            <div className="exp-track-base" />
            <div className="exp-track-fill" ref={fillRef}>
              <div className="exp-track-head" />
            </div>
          </div>

          <div className="exp-cards">
            {jobs.map((job, i) => (
              <div
                key={i}
                className="exp-card"
                style={{ '--delay': `${i * 70}ms` }}
              >
                <div className="exp-dot" aria-hidden="true" />

                <div className="exp-card-inner spotlight">
                  <div className="exp-card-head">
                    <div className="exp-meta">
                      <span className="exp-period">{job.period}</span>
                      {job.current && <span className="exp-tag-current">current</span>}
                    </div>
                    <a href={job.url} target="_blank" rel="noreferrer" className="exp-logo-link" title={job.company}>
                      <img src={job.logo} alt={job.company} className="exp-logo" />
                    </a>
                  </div>

                  <h3 className="exp-role">{job.role}</h3>
                  <p className="exp-company">{job.company}</p>

                  <ul className="exp-bullets">
                    {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
