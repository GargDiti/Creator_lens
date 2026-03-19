import React from 'react'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className="min-h-screen text-white cosmic-bg">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.35),transparent_55%)]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h1 className="text-5xl font-bold mb-6">About CreatorLens</h1>
          <p className="text-xl text-white/80">
            Empowering brands and creators with data-driven decisions through intelligent influencer analytics.
          </p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-white/80 leading-relaxed mb-4">
              CreatorLens was founded to solve a critical problem in influencer marketing: fake followers and inflated engagement metrics.
            </p>
            <p className="text-lg text-white/80 leading-relaxed mb-4">
              We believe that authentic partnerships between brands and creators should be based on real data and genuine audience engagement. Our platform uses advanced analytics and AI to detect suspicious activity and provide transparent insights.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              By making authenticity verification accessible and easy, we're building trust in the influencer industry one creator at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-12 text-center"
          >
            Our Approach
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Data-Driven', desc: 'Every analysis is backed by comprehensive data collection and verification.' },
              { title: 'Transparent', desc: 'We clearly explain our methodology so you understand the insights.' },
              { title: 'Accurate', desc: 'Our AI models are trained on millions of data points for accuracy.' },
              { title: 'Fast', desc: 'Get real-time analysis in seconds, not days.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              >
                <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${i % 2 === 0 ? 'from-fuchsia-500 via-indigo-400 to-sky-400' : 'from-emerald-400 via-cyan-400 to-sky-600'} opacity-40 blur-2xl`} />
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
