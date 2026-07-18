import { useEffect } from 'react'

function Skills() {
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in')
    const skillBars = document.querySelectorAll('.skill-progress')

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetWidth = entry.target.getAttribute('data-width') || '50%'
            entry.target.style.width = '0%'
            setTimeout(() => {
              entry.target.style.width = targetWidth
            }, 100)
            skillObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    fadeElements.forEach((el) => fadeObserver.observe(el))
    skillBars.forEach((bar) => skillObserver.observe(bar))

    return () => {
      fadeObserver.disconnect()
      skillObserver.disconnect()
    }
  }, [])

  return (
    <section id="skills" className="py-20 sm:py-24 bg-darkBg text-white border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 fade-in tracking-tight">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto fade-in text-sm sm:text-base">
            A comprehensive overview of my technical expertise and professional capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Backend Skills */}
          <div className="bg-cardBg p-6 sm:p-8 rounded-2xl border border-cardBorder fade-in hover:border-primary/40 transition-all duration-300 shadow-xl">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-6 mx-auto">
              <i className="ri-server-line ri-2x"></i>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-center mb-6 text-white">
              Backend Development
            </h3>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span className="font-medium text-gray-300">Node.js</span>
                  <span className="text-primary font-semibold">50%</span>
                </div>
                <div className="skill-bar bg-[#1f1f1f]">
                  <div className="skill-progress" data-width="50%" style={{ width: '50%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span className="font-medium text-gray-300">Express</span>
                  <span className="text-primary font-semibold">60%</span>
                </div>
                <div className="skill-bar bg-[#1f1f1f]">
                  <div className="skill-progress" data-width="60%" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span className="font-medium text-gray-300">MongoDB</span>
                  <span className="text-primary font-semibold">65%</span>
                </div>
                <div className="skill-bar bg-[#1f1f1f]">
                  <div className="skill-progress" data-width="65%" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span className="font-medium text-gray-300">PostgreSQL</span>
                  <span className="text-primary font-semibold">70%</span>
                </div>
                <div className="skill-bar bg-[#1f1f1f]">
                  <div className="skill-progress" data-width="70%" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Frontend Skills */}
          <div className="bg-cardBg p-6 sm:p-8 rounded-2xl border border-cardBorder fade-in hover:border-primary/40 transition-all duration-300 shadow-xl">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-6 mx-auto">
              <i className="ri-code-s-slash-line ri-2x"></i>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-center mb-6 text-white">
              Frontend Development
            </h3>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span className="font-medium text-gray-300">HTML</span>
                  <span className="text-primary font-semibold">80%</span>
                </div>
                <div className="skill-bar bg-[#1f1f1f]">
                  <div className="skill-progress" data-width="80%" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span className="font-medium text-gray-300">CSS</span>
                  <span className="text-primary font-semibold">50%</span>
                </div>
                <div className="skill-bar bg-[#1f1f1f]">
                  <div className="skill-progress" data-width="50%" style={{ width: '50%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span className="font-medium text-gray-300">JavaScript</span>
                  <span className="text-primary font-semibold">75%</span>
                </div>
                <div className="skill-bar bg-[#1f1f1f]">
                  <div className="skill-progress" data-width="75%" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tools & DevOps */}
          <div className="bg-cardBg p-6 sm:p-8 rounded-2xl border border-cardBorder fade-in hover:border-primary/40 transition-all duration-300 shadow-xl">
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-6 mx-auto">
              <i className="ri-palette-line ri-2x"></i>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-center mb-6 text-white">
              Tools & DevOps
            </h3>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span className="font-medium text-gray-300">Git/GitHub</span>
                  <span className="text-primary font-semibold">75%</span>
                </div>
                <div className="skill-bar bg-[#1f1f1f]">
                  <div className="skill-progress" data-width="75%" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span className="font-medium text-gray-300">Postman</span>
                  <span className="text-primary font-semibold">70%</span>
                </div>
                <div className="skill-bar bg-[#1f1f1f]">
                  <div className="skill-progress" data-width="70%" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span className="font-medium text-gray-300">Docker (basics)</span>
                  <span className="text-primary font-semibold">60%</span>
                </div>
                <div className="skill-bar bg-[#1f1f1f]">
                  <div className="skill-progress" data-width="60%" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Skills */}
        <div className="mt-10 sm:mt-12 bg-cardBg p-6 sm:p-8 rounded-2xl border border-cardBorder fade-in">
          <h3 className="text-lg sm:text-xl font-bold mb-6 text-center text-white">
            Additional Expertise
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="flex items-center p-3 border border-[#262626] rounded-xl hover:border-primary transition-colors bg-[#1a1a1a]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary">
                <i className="ri-test-tube-line ri-lg"></i>
              </div>
              <span className="ml-2 text-xs sm:text-sm font-medium text-gray-300">Deployment</span>
            </div>

            <div className="flex items-center p-3 border border-[#262626] rounded-xl hover:border-primary transition-colors bg-[#1a1a1a]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary">
                <i className="ri-cloud-line ri-lg"></i>
              </div>
              <span className="ml-2 text-xs sm:text-sm font-medium text-gray-300">AWS (basics)</span>
            </div>

            <div className="flex items-center p-3 border border-[#262626] rounded-xl hover:border-primary transition-colors bg-[#1a1a1a]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary">
                <i className="ri-terminal-box-line ri-lg"></i>
              </div>
              <span className="ml-2 text-xs sm:text-sm font-medium text-gray-300">CI/CD</span>
            </div>

            <div className="flex items-center p-3 border border-[#262626] rounded-xl hover:border-primary transition-colors bg-[#1a1a1a]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary">
                <i className="ri-database-2-line ri-lg"></i>
              </div>
              <span className="ml-2 text-xs sm:text-sm font-medium text-gray-300">RESTful APIs</span>
            </div>

            <div className="flex items-center p-3 border border-[#262626] rounded-xl hover:border-primary transition-colors bg-[#1a1a1a]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary">
                <i className="ri-speed-line ri-lg"></i>
              </div>
              <span className="ml-2 text-xs sm:text-sm font-medium text-gray-300">Error Handling</span>
            </div>

            <div className="flex items-center p-3 border border-[#262626] rounded-xl hover:border-primary transition-colors bg-[#1a1a1a]">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary">
                <i className="ri-layout-grid-line ri-lg"></i>
              </div>
              <span className="ml-2 text-xs sm:text-sm font-medium text-gray-300">Auth & Security</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
