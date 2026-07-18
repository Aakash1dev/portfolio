import { useEffect } from 'react'

const projectsData = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description:
      'A complete online shopping solution with advanced filtering, cart functionality, and secure checkout.',
    image:
      'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=600',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#',
  },
  {
    id: 2,
    title: 'Analytics Dashboard',
    description:
      'Real-time data visualization dashboard for monitoring business metrics and user behavior.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    tags: ['Vue.js', 'D3.js', 'Firebase'],
    link: '#',
  },
  {
    id: 3,
    title: 'Fitness Mobile App',
    description:
      'Comprehensive fitness tracking application with workout plans, progress tracking, and social features.',
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
    tags: ['React Native', 'GraphQL', 'AWS'],
    link: '#',
  },
  {
    id: 4,
    title: 'Corporate Website',
    description:
      'Modern, responsive website for a financial services company with custom CMS integration.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    tags: ['WordPress', 'SASS', 'JavaScript'],
    link: '#',
  },
  {
    id: 5,
    title: 'Learning Platform',
    description:
      'Interactive e-learning platform with course management, video lessons, and progress tracking.',
    image:
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=600',
    tags: ['Angular', 'Express', 'PostgreSQL'],
    link: '#',
  },
  {
    id: 6,
    title: 'Social Network',
    description:
      'Community platform with profiles, real-time messaging, content sharing, and notifications.',
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
    tags: ['Next.js', 'Socket.io', 'MongoDB'],
    link: '#',
  },
]

function Projects() {
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    fadeElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-20 sm:py-24 bg-darkBg text-white border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 fade-in tracking-tight">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto fade-in text-sm sm:text-base">
            A selection of my recent work across web development, backend architecture, and interactive web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="project-card bg-cardBg rounded-2xl border border-cardBorder overflow-hidden fade-in flex flex-col justify-between group hover:border-primary/40 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="h-48 sm:h-52 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cardBg via-transparent to-transparent opacity-80"></div>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-xs sm:text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#1f1f1f] text-gray-300 border border-[#333333] px-2.5 sm:px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <a
                  href={project.link}
                  className="text-primary font-medium text-xs sm:text-sm inline-flex items-center group/link hover:text-white transition-colors"
                >
                  View Project
                  <i className="ri-arrow-right-line ml-1.5 transform group-hover/link:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-14 fade-in">
          <a
            href="https://github.com/Aakash1dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary font-semibold text-sm sm:text-base hover:text-white transition-colors group"
          >
            View All Projects on GitHub
            <i className="ri-arrow-right-line ml-2 transform group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
