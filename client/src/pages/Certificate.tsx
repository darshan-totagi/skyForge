import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Certificate() {
  const href = "/certificates/sample-certificate.svg";
  const fileName = "Sample-Certificate.svg";
  return (
    <MainLayout>
      <section className="container mx-auto px-4 md:px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card/50 border-primary/20 overflow-hidden">
            <CardHeader className="border-b border-primary/20">
              <CardTitle className="text-2xl">Sample Certificate</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-[1.414/1] w-full bg-background">
                <img
                  src={href}
                  alt="Sample Certificate"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 flex justify-end">
                <a href={href} download={fileName}>
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Download Sample
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
}
