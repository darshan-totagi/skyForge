import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 md:px-6 py-16 lg:py-24 relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Terms and Conditions – SkyForger</h1>
            <p className="text-muted-foreground mb-8">Last Updated: March 2026</p>

            <div className="prose prose-invert max-w-none space-y-8 text-lg leading-relaxed text-muted-foreground">
              <section>
                <p>
                  Welcome to SkyForger. By accessing or using our website and services, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree with these terms, please do not use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. About SkyForger</h2>
                <p>
                  SkyForger is an online platform that provides students and learners with opportunities to participate in internships, projects, and skill development programs.
                </p>
                <p className="mt-2">
                  Our goal is to help individuals gain practical experience and improve their professional skills.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. Eligibility</h2>
                <p>By using our services, you confirm that:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>You are at least 16 years old</li>
                  <li>The information you provide during registration is accurate and truthful</li>
                  <li>You will use the platform for lawful purposes only</li>
                </ul>
                <p className="mt-4 text-primary font-medium">
                  SkyForger reserves the right to suspend or terminate accounts that provide false information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Internship Participation</h2>
                <p>Participants who enroll in internships or programs through SkyForger agree to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Complete assigned tasks or projects within the specified time</li>
                  <li>Maintain professional conduct while interacting with mentors and team members</li>
                  <li>Follow the guidelines provided for the internship program</li>
                </ul>
                <p className="mt-4">Failure to comply with these requirements may result in removal from the program.</p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Certificates</h2>
                <p>
                  SkyForger may provide internship certificates or completion certificates to participants who successfully complete the required tasks or project work.
                </p>
                <p className="mt-2">
                  Certificates are issued based on performance and completion criteria determined by SkyForger.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Payments</h2>
                <p>Some programs or services offered by SkyForger may require a registration and are free.</p>
                <p className="mt-2 text-foreground font-semibold">By making a payment, users agree that:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Payments are made voluntarily for participation in programs</li>
                  <li>Fees may cover administrative costs, platform maintenance, and certification services</li>
                  <li>SkyForger reserves the right to modify registration for its services at any time.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Intellectual Property</h2>
                <p>
                  All content on the SkyForger website, including logos, text, graphics, and platform design, is the property of SkyForger unless otherwise stated.
                </p>
                <p className="mt-2">
                  Users may not copy, reproduce, or distribute any content without prior permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. User Conduct</h2>
                <p>Users agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Misuse the platform or attempt unauthorized access</li>
                  <li>Submit false or misleading information</li>
                  <li>Engage in abusive or harmful behavior toward other users</li>
                </ul>
                <p className="mt-4">Violation of these rules may result in account suspension or permanent ban.</p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Limitation of Liability</h2>
                <p>
                  SkyForger provides internships and skill development opportunities for learning purposes. While we strive to provide valuable experiences, we do not guarantee employment, job placement, or career outcomes.
                </p>
                <p className="mt-2">
                  SkyForger will not be liable for any indirect or consequential damages resulting from the use of the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Changes to Terms</h2>
                <p>
                  SkyForger reserves the right to modify or update these Terms and Conditions at any time. Continued use of the platform after changes indicates acceptance of the updated terms.
                </p>
              </section>

              <section className="bg-primary/5 p-8 rounded-2xl border border-primary/20 mt-12">
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">10. Contact Information</h2>
                <div className="space-y-2 text-foreground">
                  <p><span className="font-semibold">Company Name:</span> SkyForger</p>
                  <p><span className="font-semibold">Email:</span> skyforge@gmail.com</p>
                  <p><span className="font-semibold">Founder:</span> Darshan</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
