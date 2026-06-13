import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import {
  ShieldCheck, Award, FileText, Download, ArrowRight, CheckCircle2, Building2,
  GraduationCap, Stethoscope, Leaf, Briefcase, Users, HandHeart, Sparkles, AlertCircle,
} from 'lucide-react'

import Button from '../components/shared/Button'
import SectionHeader from '../components/shared/SectionHeader'
import AnimatedCounter from '../components/shared/AnimatedCounter'
import FundCharts from '../components/partner/FundCharts'
import TestimonialTabs from '../components/shared/TestimonialTabs'
import {
  trustSignals, csrFocusAreas, csrResources, corporatePartners, csrModels,
  recognitions, impactStats, csrBudgetRanges, csrInterestAreas,
} from '../data/placeholder'

// Icon name -> component map (data keeps strings for easy editing)
const icons = {
  GraduationCap, Stethoscope, Leaf, Briefcase, Users, HandHeart,
}

function Partner() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [status, setStatus] = useState({ state: 'idle', message: '' }) // idle | submitting | success | error
  const submitting = status.state === 'submitting'

  const onSubmit = async (data) => {
    setStatus({ state: 'submitting', message: '' })
    try {
      const res = await fetch('/api/csr-partnership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: data.company,
          contact_person: data.contact,
          designation: data.designation,
          email: data.email,
          phone: data.phone,
          csr_budget_range: data.budget,
          area_of_interest: data.interest,
          message: data.message,
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong.')
      setStatus({ state: 'success', message: 'Enquiry sent! Our partnerships team responds within 48 hours.' })
      reset()
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Could not submit. Please try again.' })
    }
  }

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-secondary overflow-hidden">
        <div className="absolute inset-0 pattern-maratha opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-semibold tracking-wide uppercase mb-6">
              <Sparkles className="w-4 h-4" /> For Corporates & CSR Partners
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-5 leading-tight">
              Invest in Impact.<br />
              <span className="text-gold">Partner With Purpose.</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl">
              A credible, transparent, youth-led platform to deploy your CSR funds where they create
              measurable social change — across Pune and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#enquiry" variant="primary">Start a Partnership <ArrowRight className="w-4 h-4" /></Button>
              <Button href="#resources" variant="secondary"><Download className="w-4 h-4" /> Download Brochure</Button>
            </div>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14"
          >
            {trustSignals.map((t) => (
              <div key={t.label} className="bg-white/5 backdrop-blur-sm border border-gold/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-wide mb-1">
                  <ShieldCheck className="w-4 h-4" /> {t.label}
                </div>
                <div className="text-white text-sm font-medium">{t.value}</div>
              </div>
            ))}
          </motion.div>
          <p className="text-white/30 text-[11px] mt-4">*Tax-exemption / registration details are placeholders — replace with verified credentials.</p>
        </div>
      </section>

      {/* ---------------- IMPACT BAND ---------------- */}
      <section className="py-14 md:py-20 bg-white border-b border-neutral-mid">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {impactStats.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display text-primary">
                  <AnimatedCounter end={s.value} prefix={s.prefix || ''} suffix={s.suffix} />
                </div>
                <div className="h-0.5 w-10 bg-gold mx-auto my-2" />
                <div className="text-xs md:text-sm text-secondary font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FOCUS AREAS ---------------- */}
      <section className="py-16 md:py-24 bg-neutral relative overflow-hidden">
        <div className="absolute inset-0 pattern-fort opacity-[0.04]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeader title="Our CSR Focus Areas" subtitle="केंद्रबिंदू — Where Your Funds Work" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {csrFocusAreas.map((area, i) => {
              const Icon = icons[area.icon]
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group bg-white rounded-2xl p-7 shadow-card border border-transparent hover:border-gold hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary-subtle flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                    {Icon && <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />}
                  </div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">{area.title}</h3>
                  <p className="text-secondary-light text-sm">{area.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------- FUND TRANSPARENCY ---------------- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeader title="Transparency You Can Audit" subtitle="पारदर्शकता — Where Every Rupee Goes" />
          <FundCharts />
        </div>
      </section>

      {/* ---------------- ENGAGEMENT MODELS ---------------- */}
      <section className="py-16 md:py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeader title="Partnership Models" subtitle="भागीदारी — Ways to Engage" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {csrModels.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
                  m.featured
                    ? 'bg-secondary text-white shadow-card-hover lg:scale-[1.03] border-2 border-gold'
                    : 'bg-white shadow-card border border-gold/20 hover:border-gold hover:shadow-card-hover'
                }`}
              >
                {m.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-secondary text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className={`text-xl font-semibold mb-1 ${m.featured ? 'text-white' : 'text-secondary'}`}>{m.name}</h3>
                <div className={`text-2xl font-display mb-3 ${m.featured ? 'text-gold' : 'text-primary'}`}>{m.range}</div>
                <p className={`text-sm mb-6 ${m.featured ? 'text-white/70' : 'text-secondary-light'}`}>{m.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {m.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${m.featured ? 'text-white/90' : 'text-secondary'}`}>
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Button href="#enquiry" variant={m.featured ? 'primary' : 'secondary'} className="w-full">
                  Choose {m.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- RECOGNITION STRIP ---------------- */}
      <section className="py-12 md:py-16 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 pattern-maratha opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <p className="text-center text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-8">
            Recognition & Certifications
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {recognitions.map((r) => (
              <div key={r.label} className="flex items-center gap-3 justify-center text-center">
                <Award className="w-8 h-8 text-gold flex-shrink-0" />
                <div className="text-left">
                  <div className="text-white font-semibold text-sm">{r.label}</div>
                  <div className="text-white/50 text-xs">{r.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PAST PARTNERS ---------------- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeader title="Trusted by Forward-Thinking Corporates" subtitle="आमचे सहकारी — Our Partners" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {corporatePartners.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="h-24 rounded-xl bg-neutral border border-neutral-mid flex items-center justify-center grayscale hover:grayscale-0 hover:border-gold transition-all duration-300"
              >
                {/* PLACEHOLDER - replace with <img src={p.logo} /> */}
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="max-h-12" />
                ) : (
                  <span className="flex items-center gap-2 text-secondary-light font-semibold text-sm">
                    <Building2 className="w-5 h-5" /> {p.name}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="py-16 md:py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeader title="What Partners & Beneficiaries Say" subtitle="अनुभव — Voices of Impact" />
          <TestimonialTabs />
        </div>
      </section>

      {/* ---------------- RESOURCES ---------------- */}
      <section id="resources" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <SectionHeader title="Download Resources" subtitle="दस्तऐवज — Reports & Decks" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {csrResources.map((r, i) => (
              <motion.a
                key={r.title}
                href={r.href} /* PLACEHOLDER - real PDF path */
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col bg-neutral rounded-2xl p-6 border border-gold/20 hover:border-gold hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-subtle flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <FileText className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-secondary mb-1">{r.title}</h3>
                <p className="text-sm text-secondary-light mb-4 flex-1">{r.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary-muted">{r.size}</span>
                  <span className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    <Download className="w-4 h-4" /> Download
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ENQUIRY FORM ---------------- */}
      <section id="enquiry" className="py-16 md:py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 pattern-fort opacity-[0.06]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl md:text-4xl font-display text-gold mb-4">Start a CSR Partnership</h2>
              <p className="text-white/70 mb-8">
                Tell us about your CSR goals. Our partnerships team responds within 48 hours with a
                tailored proposal and impact projections.
              </p>
              <ul className="space-y-4">
                {['Dedicated relationship manager', 'Custom impact reporting', 'Employee volunteering opportunities', 'Co-branded recognition'].map((b) => (
                  <li key={b} className="flex items-center gap-3 text-white/90 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit(onSubmit)}
              className="lg:col-span-3 bg-white rounded-2xl p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              <Field label="Company Name" error={errors.company}>
                <input {...register('company', { required: true })} className={inputCls} placeholder="Acme Corp" />
              </Field>
              <Field label="Contact Person" error={errors.contact}>
                <input {...register('contact', { required: true })} className={inputCls} placeholder="Full name" />
              </Field>
              <Field label="Designation" error={errors.designation}>
                <input {...register('designation')} className={inputCls} placeholder="CSR Head" />
              </Field>
              <Field label="Email" error={errors.email}>
                <input {...register('email', { required: true })} type="email" className={inputCls} placeholder="you@company.com" />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input {...register('phone', { required: true })} type="tel" className={inputCls} placeholder="+91 ..." />
              </Field>
              <Field label="CSR Budget Range" error={errors.budget}>
                <select {...register('budget', { required: true })} className={inputCls} defaultValue="">
                  <option value="" disabled>Select range</option>
                  {csrBudgetRanges.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="Area of Interest" error={errors.interest} full>
                <select {...register('interest', { required: true })} className={inputCls} defaultValue="">
                  <option value="" disabled>Select focus area</option>
                  {csrInterestAreas.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </Field>
              <Field label="Message" full>
                <textarea {...register('message')} rows={4} className={inputCls} placeholder="Tell us about your CSR objectives..." />
              </Field>
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm text-secondary-light cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('consent', { required: true })}
                    className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0"
                  />
                  <span>
                    I consent to Rotaract Club of Pune City Fortune storing and processing the
                    information provided, for the purpose of this enquiry and related communication.
                  </span>
                </label>
                {errors.consent && (
                  <span className="text-red-500 text-xs mt-1 block">You must consent to proceed</span>
                )}
              </div>

              <div className="sm:col-span-2">
                {status.state === 'success' && (
                  <div className="flex items-center gap-2 p-3 mb-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> {status.message}
                  </div>
                )}
                {status.state === 'error' && (
                  <div className="flex items-center gap-2 p-3 mb-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" /> {status.message}
                  </div>
                )}
                <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                  {submitting ? 'Sending…' : <>Send Enquiry <ArrowRight className="w-4 h-4" /></>}
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  )
}

const inputCls =
  'w-full px-4 py-3 bg-neutral border border-neutral-mid rounded-lg text-secondary placeholder:text-secondary-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'

function Field({ label, error, full, children }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="block text-sm font-medium text-secondary mb-1.5">{label}</label>
      {children}
      {error && <span className="text-red-500 text-xs mt-1 block">This field is required</span>}
    </div>
  )
}

export default Partner
