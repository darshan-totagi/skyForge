import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";

export default function Privacy() {
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
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Privacy Policy – SkyForger</h1>
            <p className="text-muted-foreground mb-8">Last Updated: March 2026</p>

            <div className="prose prose-invert max-w-none space-y-8 text-lg leading-relaxed text-muted-foreground">
              <section>
                <p>
                  At SkyForger, we value the privacy of our users and are committed to protecting personal information. This Privacy Policy explains how we collect, use, and safeguard the information provided by users when they visit our website or apply for internships.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">1. Information We Collect</h2>
                <p>We may collect the following types of information when users interact with our platform:</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Personal Information</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Full Name</li>
                      <li>Email Address</li>
                      <li>Phone Number</li>
                      <li>College / University Name</li>
                      <li>Resume or Portfolio</li>
                      <li>Any information submitted through application forms</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2">Non-Personal Information</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Browser type</li>
                      <li>Device information</li>
                      <li>IP address</li>
                      <li>Pages visited on our website</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-4">This information helps us improve our services and provide a better user experience.</p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">2. How We Use Your Information</h2>
                <p>SkyForger may use the collected information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>To process internship applications</li>
                  <li>To communicate with applicants regarding opportunities</li>
                  <li>To send updates about internships, programs, or certificates</li>
                  <li>To improve our website and platform services</li>
                  <li>To maintain platform security and prevent misuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">3. Information Sharing</h2>
                <p>SkyForger does not sell, trade, or rent personal information to third parties.</p>
                <p className="mt-2">We may share limited information only in the following cases:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>With mentors or project coordinators for internship evaluation</li>
                  <li>When required by law or legal processes</li>
                  <li>To protect the rights and security of SkyForger and its users</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">4. Data Security</h2>
                <p>
                  We take reasonable measures to protect user information from unauthorized access, misuse, or disclosure. However, no internet-based system is completely secure, and users provide information at their own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">5. Cookies and Tracking Technologies</h2>
                <p>
                  Our website may use cookies or similar technologies to enhance user experience, analyze website traffic, and remember user preferences. Users may choose to disable cookies through their browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">6. Third-Party Links</h2>
                <p>
                  Our platform may contain links to third-party websites or services. SkyForger is not responsible for the privacy practices or content of these external websites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">7. User Rights</h2>
                <p>Users may request to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Update their personal information</li>
                  <li>Delete their submitted information</li>
                  <li>Opt out of certain communications</li>
                </ul>
                <p className="mt-4">Requests can be made by contacting us via email.</p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">8. Changes to This Policy</h2>
                <p>
                  SkyForger may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </section>

              <section className="bg-primary/5 p-8 rounded-2xl border border-primary/20 mt-12">
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">9. Contact Us</h2>
                <div className="space-y-2 text-foreground">
                  <p><span className="font-semibold">Company Name:</span> SkyForger</p>
                  <p><span className="font-semibold">Email:</span> skyforger@gmail.com</p>
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
