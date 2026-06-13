import { motion } from 'framer-motion'
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'

import { fundUtilisation, fundsByYear } from '../../data/placeholder'

// CSR fund transparency charts — PLACEHOLDER data, see placeholder.js
function FundCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Allocation pie */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-gold/20"
      >
        <h3 className="text-lg font-semibold text-secondary mb-1">How Funds Are Utilised</h3>
        <p className="text-sm text-secondary-light mb-6">Every rupee, accounted for.</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fundUtilisation}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
                stroke="none"
              >
                {fundUtilisation.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, n) => [`${v}%`, n]}
                contentStyle={{ borderRadius: 12, border: '1px solid #C9A84C', fontSize: 13 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-4 space-y-2">
          {fundUtilisation.map((item) => (
            <li key={item.name} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-secondary">
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                {item.name}
              </span>
              <span className="font-semibold text-secondary">{item.value}%</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Funds by year bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 md:p-8 shadow-card border border-gold/20"
      >
        <h3 className="text-lg font-semibold text-secondary mb-1">Funds Mobilised Year-on-Year</h3>
        <p className="text-sm text-secondary-light mb-6">In ₹ Lakhs · steady, sustained growth.</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fundsByYear} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDE8DF" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#5A5A5A' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#5A5A5A' }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v) => [`₹${v}L`, 'Raised']}
                cursor={{ fill: '#FFF0E5' }}
                contentStyle={{ borderRadius: 12, border: '1px solid #C9A84C', fontSize: 13 }}
              />
              <Bar dataKey="amount" fill="#FF6B00" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}

export default FundCharts
