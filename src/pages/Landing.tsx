import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, BookOpen, Zap, GitCompare, User, GraduationCap } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex p-4 rounded-2xl bg-primary/10 mb-8"
            >
              <Scissors className="w-12 h-12 text-primary" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              Rod Cutting Algorithms
              <span className="block mt-2 gradient-text">Greedy vs Dynamic Programming</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              An interactive educational journey exploring two fundamental algorithmic approaches
              to the classic rod cutting optimization problem.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/theory">
                <Button size="lg" className="hero-gradient text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  Enter Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-20 max-w-5xl mx-auto"
          >
            {[
              { icon: BookOpen, label: 'Theory', desc: 'Learn the concepts', color: 'primary' },
              { icon: Zap, label: 'Greedy', desc: 'Fast heuristic', color: 'greedy' },
              { icon: GitCompare, label: 'DP', desc: 'Optimal solution', color: 'dp' },
              { icon: Scissors, label: 'Compare', desc: 'Side by side', color: 'primary' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card rounded-xl p-6 text-center cursor-pointer"
              >
                <div
                  className={`inline-flex p-3 rounded-lg mb-3 ${
                    item.color === 'greedy'
                      ? 'bg-greedy/10'
                      : item.color === 'dp'
                      ? 'bg-dp/10'
                      : 'bg-primary/10'
                  }`}
                >
                  <item.icon
                    className={`w-6 h-6 ${
                      item.color === 'greedy'
                        ? 'text-greedy'
                        : item.color === 'dp'
                        ? 'text-dp'
                        : 'text-primary'
                    }`}
                  />
                </div>
                <h3 className="font-semibold mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Credits Section */}
        <section className="container mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl font-bold text-center mb-8 gradient-text">
                Project Credits
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Doctor */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-4 rounded-xl bg-muted/30"
                >
                  <div className="inline-flex p-3 rounded-full bg-primary/10 mb-3">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Doctor</p>
                  <p className="font-semibold">Dr / Mona Elbedwehy </p>
                </motion.div>

                {/* Supervisor */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-4 rounded-xl bg-muted/30"
                >
                  <div className="inline-flex p-3 rounded-full bg-dp/10 mb-3">
                    <BookOpen className="w-6 h-6 text-dp" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Supervisor</p>
                  <p className="font-semibold">Eng / Maya Hesham </p>
                </motion.div>

                {/* Student */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-4 rounded-xl bg-muted/30"
                >
                  <div className="inline-flex p-3 rounded-full bg-greedy/10 mb-3">
                    <User className="w-6 h-6 text-greedy" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Student</p>
                  <p className="font-semibold">Fares Elghopashy</p>
                  <p className="text-xs text-muted-foreground mt-1">ID: [OPTIONAL ID]</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Rod Cutting Algorithms Educational Project • Algorithms Course</p>
        </div>
      </footer>
    </div>
  );
}
